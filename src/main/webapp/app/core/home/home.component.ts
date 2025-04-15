import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import CourseService from '@/entities/course/course.service';
import type { ICourse } from '@/shared/model/course.model';
import type { ICourseItem } from '@/shared/model/course-item.model';
import axios from '@/shared/config/axios'; // Use the custom instance
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    const { t: t$ } = useI18n();
    const courses = ref<ICourse[]>([]);
    const loading = ref(true);
    const courseService = new CourseService();

    onMounted(async () => {
      try {
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        if (!token) {
          console.error('No JWT token found. Please log in.');
          loading.value = false;
          return;
        }

        // Fetch courses
        const response = await courseService.findAll();
        let fetchedCourses: ICourse[] = response;
        console.log('Fetched courses:', fetchedCourses);

        // Fetch items for each course
        for (const course of fetchedCourses) {
          try {
            const itemsResponse = await axios.get<ICourseItem[]>(`/api/courses/${course.id}/items`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            course.items = itemsResponse.data;
          } catch (error) {
            console.error(`Error fetching items for course ${course.id}:`, error);
            course.items = [];
          }
        }

        // Map courses to ensure proper structure
        courses.value = fetchedCourses.map(course => ({
          id: course.id,
          title: course.title || 'Untitled Course',
          description: course.description || 'No description available',
          price: course.price || 0,
          imageUrl: course.imageUrl || null,
          items: course.items || [],
        }));
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        loading.value = false;
      }
    });

    const goToCourseItems = (courseId: number) => {
      router.push(`/course/${courseId}/items`);
    };

    const getYouTubeEmbedUrl = (url: string): string => {
      try {
        const videoIdMatch = url.match(/(?:v=)([^&]+)/) || url.match(/(?:youtu\.be\/)([^?]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (!videoId) {
          console.error('Invalid YouTube URL:', url);
          return '';
        }
        return `https://www.youtube.com/embed/${videoId}`;
      } catch (error) {
        console.error('Error parsing YouTube URL:', error);
        return '';
      }
    };

    return {
      courses,
      loading,
      goToCourseItems,
      getYouTubeEmbedUrl,
      t$,
    };
  },
});
