<template lang="pug">
  v-card
    v-card-title
      | English table
      v-spacer
      v-text-field(append-icon='search', label='Search', single-line, hide-details, v-model='search')
    v-data-table.elevation-1(v-bind:headers='headers', v-bind:items='items', v-bind:search='search', v-bind:pagination.sync='pagination', :total-items='totalItems', :loading='loading')
      template(slot='headerCell', scope='props')
        span(v-tooltip:bottom="{ 'html': props.header.text }")
          | {{ props.header.text }}
      template(slot='items', scope='props')
        td {{ props.item.name }}
        td.text-xs-right {{ props.item.calories }}

</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      search: '',
      totalItems: 0,
      loading: true,
      pagination: {},
      headers: [
        {
          text: 'Position',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Name', align: 'left', sortable: false, value: 'calories' }
      ],
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408
        },
        {
          value: false,
          name: 'Donut',
          calories: 452
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
