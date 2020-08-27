var app = new Vue({
  el: '#app',
  data: {
    temProduct: {}, //用來存寫進來的 products 物件
    products: [
      {
        id: 1586934917210,
        unit: '盒(6個)',
        category: '塔',
        title: '葡式蛋塔',
        origin_price: 650,
        price: 600,
        description: '很好吃的呀',
        content: '這麼好吃不買嗎？',
        is_enabled: 1,
        imageUrl:
          'https://images.unsplash.com/photo-1582957736245-5f5a244ee74d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
      },
      {
        id: 1196934917910,
        unit: '盒(6個)',
        category: '馬卡龍',
        title: '焦糖馬卡龍',
        origin_price: 450,
        price: 400,
        description: '看完都餓了',
        content: '真的不買嗎？',
        is_enabled: 0,
        imageUrl:
          'https://images.unsplash.com/photo-1574767787687-bf270ed618c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      },
    ],
  },
  methods: { // 方便管理
    updateProduct(){
      if(this.temProduct.id){ // 看有沒有 id, 沒有=> 新增產品
        var i;
        this.products.forEach((item, key)=>{
          if(item.id === this.temProduct.id){
            i = key; // 找出當前的 id
          }
        });
      } else { // 新增產品
        //const id = new Data().getTime(); // 取 unix 時間
        const id = (new Date ()).getTime(); // 賦予 id
        this.temProduct.id = id;
        this.products.push(this.temProduct);
      }

      console.log(i, this.temProduct);
      // this.$set(目標, 屬性, 值) ;
      this.$set(this.products, i, this.temProduct); 
      this.temProduct = {}; // 兩個又是同一個物件，為了避免傳參考的特質，新增一個空物件
      $('#productModal').modal('hide');
    },
    deleteProduct(id){ // 傳入參數 id
      //console.log(id);
      var i;
      this.products.forEach((item, key) => {
        // 刪除2. 取得 id 後會跟 item.id 作比對，一樣的話會被刪除
        if(item.id === id){ // 與傳進來的 id 作比對
          i = key; // 找出當前的 id
        }
      });
      console.log(i);
      this.products.splice(i, 1); // 刪除一筆資料
      $('#delProductModal').modal('hide');
    },
    openModal(isNew, item) { // 觸發時帶入參數 
      switch (isNew) { // 判斷 modal 一個一個打開
        case 'new': // 判斷時看參數
          this.temProduct = {};
          $('#productModal').modal('show');
          break;
        case 'edit': 
          // 打開 modal 先 copy 這個產品資料到 temProduct
          // 淺拷貝 -> Object.assign({}, 要插入的值)
          this.temProduct = Object.assign({}, item); // item = edit 傳來的資料
          $('#productModal').modal('show');
          break;
        case 'delete':
          this.temProduct = Object.assign({}, item); // 抓到要刪除的產品名稱顯示在 modal
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },
  },
});
