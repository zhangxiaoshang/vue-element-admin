<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.type" placeholder="操作类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in types" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-input v-model="listQuery.api" placeholder="操作表名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        prop="uid"
        label="UID"
      />
      <el-table-column
        prop="nickname"
        label="用户昵称"
      />
      <el-table-column
        prop="phone"
        label="手机号码"
      />
      <el-table-column
        prop="api"
        label="操作表名"
      />
      <el-table-column
        prop="type"
        label="操作类型"
      />
      <el-table-column
        prop="ip"
        label="IP地址"
      />
      <el-table-column
        prop="time"
        label="操作时间"
      />
      <el-table-column
        prop="mark"
        label="操作说明"
      />
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchLogs } from '@/api/system'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Users',
  components: { Pagination },
  directives: { waves },

  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        type: '',
        api: ''
      },
      downloadLoading: false,
      types: ['添加', '删除', '修改', '登录']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchLogs(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
