<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.type" placeholder="证件类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in types" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.state" placeholder="认证状态" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in status" :key="item" :label="item" :value="item"/>
      </el-select>

      <el-input v-model="listQuery.email" placeholder="请输入邮箱" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

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
        prop="email"
        label="邮箱"
      />
      <el-table-column
        prop="phone"
        label="手机号码"
      />
      <el-table-column
        prop="time"
        label="提交时间"
      />
      <el-table-column
        prop="update"
        label="最近更新时间"
      />
      <el-table-column
        prop="name"
        label="实名"
      />
      <el-table-column
        prop="state"
        label="状态"
      />
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchAuths } from '@/api/system'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Auth',
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
        state: ''
      },
      downloadLoading: false,
      types: ['身份证', '护照'],
      status: ['未审核', '通过', '未通过', '未认证']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchAuths(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['uid', 'email', 'phone', 'state']
        const filterVal = ['uid', 'email', 'phone', 'state']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
