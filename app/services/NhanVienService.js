// chứa những gì tương tác với BE thông qua API
function NhanVienService() {
  this.mangND = [];
  this.layDanhSachNV = function () {
    // GET request for remote image in node.js
   return axios({
      method: "get",
      url: "https://5f9c1b06856f4c00168c7164.mockapi.io/nhanvien",
      responseType: "stream",
    })
   
  };
  this.themNV = function(nv){
    return axios({
      method: "post",
      url: "https://5f9c1b06856f4c00168c7164.mockapi.io/nhanvien",
      data: nv
    })
  }
  this.xoaNV = function(id){
    return axios({
      method: "delete",
      url: `https://5f9c1b06856f4c00168c7164.mockapi.io/nhanvien/${id}`
    })
  }
  this.suaNV = function(id, nv){
    return axios({
      method: "put",
      url: `https://5f9c1b06856f4c00168c7164.mockapi.io/nhanvien/${id}`,
      data: nv
    })
  }
  this.layThongTinNV = function(id){
    return axios({
      method: "get",
      url: `https://5f9c1b06856f4c00168c7164.mockapi.io/nhanvien/${id}`
    })
  }
}
