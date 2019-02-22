<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.symbol" placeholder="币对" clearable style="width: 100px" class="filter-item">
        <el-option v-for="item in symbols" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.type" placeholder="订单类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in types" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.state" placeholder="订单状态" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in status" :key="item" :label="item" :value="item"/>
      </el-select>

      <el-input v-model="listQuery.uid" placeholder="用户ID" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.id" placeholder="订单ID" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

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
        prop="id"
        label="订单号"
      />
      <el-table-column
        prop="uid"
        label="UID"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="state"
        label="状态"
      />
      <el-table-column
        prop="time"
        label="委托时间"
        min-width="110"
      />
      <el-table-column
        prop="volume"
        label="委托数量"
      />
      <el-table-column
        prop="price"
        label="委托价格"
      />
      <el-table-column
        prop="amount"
        label="委托金额"
        min-width="110"
      />
      <el-table-column
        prop="trade_volume"
        label="成交数量"
      />
      <el-table-column
        prop="avg_price"
        label="成交均价"
      />
      <el-table-column
        prop="trade_amount"
        label="成交金额"
      />
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchOrders } from '@/api/system'
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
        symbol: '',
        type: '',
        state: '',
        id: '',
        uid: ''
      },
      symbols: ['btcusdt', 'ethbtc'],
      types: ['买入', '卖出'],
      status: ['新订单', '已撤单', '完全成交'],

      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchOrders(this.listQuery).then(response => {
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
