<template>
  <div>
    <h2 id="page-heading" data-cy="CourseItemsHeading">
      <span v-text="$t('onlineCoursePlatformApp.courseItem.home.title')"></span>
    </h2>

    <br />
    <!-- No items found message -->
    <div class="alert alert-warning" v-if="!isFetching && items && items.length === 0">
      <span v-text="$t('onlineCoursePlatformApp.courseItem.home.notFound')"></span>
    </div>

    <!-- Course items table -->
    <div class="table-responsive" v-else-if="items && items.length > 0">
      <table class="table table-striped" aria-describedby="courseItems">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')"></span></th>
            <th scope="row"><span v-text="$t('onlineCoursePlatformApp.courseItem.title')"></span></th>
            <th scope="row"><span v-text="$t('onlineCoursePlatformApp.courseItem.itemType')"></span></th>
            <th scope="row"><span v-text="$t('onlineCoursePlatformApp.courseItem.contentType')"></span></th>
            <th scope="row"><span v-text="$t('onlineCoursePlatformApp.courseItem.passingScore')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" data-cy="entityTable">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.itemType }}</td>
            <td>{{ item.contentType || '-' }}</td>
            <td>{{ item.passingScore || '-' }}</td>
            <td class="text-right">
              <div class="btn-group">
                <!-- Start button for the item -->
                <button class="btn btn-success btn-sm" @click="startItem(item)">
                  <font-awesome-icon icon="play"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.start')"></span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" src="./course-items.component.ts"></script>
