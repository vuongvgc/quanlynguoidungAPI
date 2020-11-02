// .then(function (response) {
//     // THEN giúp lấy dữ từ liệu từ AIP nếu lấy dữ liệu thành công thì chạy các hàm xử lý trong
//       console.log(response.data)
//     //   danh sách người dùng cần lấy
//       return response.data
//     })
//     .catch(function (error) {
//     // nếu lấy dữ liệu không thành công thì xử lý trong catch
//         console.log(error)
//     })

// let NV = new NhanVienService();
// console.log(NV.layDanhSachNV());
/**
 * Rút gọn hàm
 */
function getEle(id) {
  return document.getElementById(id);
}
/**
 * Khai báo thể hiện của nhân viên services
 */
var NVServices = new NhanVienService();
/**
 * Lấy danh sách người dùng
 */
function layDanhSachNhanVien() {
  var axiosObj = NVServices.layDanhSachNV();
  axiosObj
    .then(function (result) {
    //   console.log(result.data);
      // hiển thị khi lấy danh sách thành công
      hienThiDanhSach(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
layDanhSachNhanVien();
/**
/**
 * Hiển thị danh sách lên table
 */
function hienThiDanhSach(mangNV) {
  var tbody = getEle("tblDanhSachNguoiDung");
  var content = "";
  var couter = 0;
  mangNV.map(function (item, index) {
    content += `
            <tr>
                <td>${(couter += 1)}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>${item.maLoaiNguoiDung}</td>
                <td>
                    <button 
                        onclick="suaNV(${item.id})" data-toggle="modal"
                        data-target="#myModal"
                        class="btn btn-primary">
                        Sửa
                    </button>
                    <button 
                        onclick="xoaNV(${item.id})" 
                        class="btn btn-danger">
                        Xóa
                    </button>
                </td>
            </tr>
        `;
  });
  tbody.innerHTML = content;
}
/**
 * Xử lý form thêm người dùng
 */
getEle("btnThemNguoiDung").addEventListener("click", function () {
  var modalFooter = document.querySelector(".modal-footer");
//   console.log(modalFooter);
    // reset form 
    resetForm();
    modalFooter.innerHTML = `
        <button id="btnThem" class="btn btn-success">Thêm</button>
    `;   
    /**
     * Lấy thông tin người
     * event click btn thêm
     * */ 
    getEle("btnThem").addEventListener("click", function(){
        var nvObj = layThongTinTuForm();
        var nvThem = NVServices.themNV(nvObj);
        // đổi với post chỉ trả về 1 đối tượng vừa mới đc thêm vào thành công chứ không phải mảng 
        nvThem.then(function(result){
            // console.log(result)
            layDanhSachNhanVien();
            // gọi sự kiện click có sẵn của button close
            // để tắt popup sau khi thêm người dùng thành công 
            document.querySelector("#myModal .modal-header .close").click();
        })
        .catch(function(error){
            console.log(error)
        })
    })

});
/**
 * Lấy thông tin từ form
 */
function layThongTinTuForm(){
    var TaiKhoan = getEle("TaiKhoan").value;
    var HoTen = getEle("HoTen").value;
    var MatKhau = getEle("MatKhau").value;
    var Email = getEle("Email").value;
    var SoDienThoai = getEle("SoDienThoai").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    // console.log(TaiKhoan, HoTen, MatKhau, Email, SoDienThoai, loaiNguoiDung);
    var nv = new NhanVien(TaiKhoan, HoTen, MatKhau, Email, SoDienThoai, loaiNguoiDung);
    // console.log(nv);
    return nv;

}
/**
 * Hàm xóa nhân viên
 */
function xoaNV(id){
    // gọi phương thức xóa trong nhân viên services
    // console.log(id);
    var axiosNV =  NVServices.xoaNV(id);
    axiosNV.then(function(rs){
        layDanhSachNhanVien();
        console.log(rs);

    })
    .catch(function(er){
        console.log(er);
    })
    // console.log("xoa");
}
/**
 * Hàm sửa nhân viên 
 */
function suaNV(id){
    //  console.log("sửa")
    // hiển thị lên popup 
    // nhấn nút cập nhật 
    // cập nhật lại API
    var modalFooter = document.querySelector(".modal-footer");
    modalFooter.innerHTML = `
        <button id="btnUpdate" class="btn btn-success">Cập Nhật</button>
    `; 
    // hiển thị thông tin lên form 
    var axiosNVObj = NVServices.layThongTinNV(id);
    axiosNVObj.then(function(rs){
        var dataNV = rs.data;
        // console.log(dataNV);
        hienThiThongLenForm(dataNV);
            /**
         * Lấy thông tin người
         * event click btn sửa
         * */ 
        getEle("btnUpdate").addEventListener("click", function(){
            var nvObj = layThongTinTuForm();
            var nvThem = NVServices.suaNV(id,nvObj);
            // đổi với post chỉ trả về 1 đối tượng vừa mới đc thêm vào thành công chứ không phải mảng 
            nvThem.then(function(result){
                // console.log(result)
                layDanhSachNhanVien();
                // gọi sự kiện click có sẵn của button close
                // để tắt popup sau khi thêm người dùng thành công 
                document.querySelector("#myModal .modal-header .close").click();
            })
            .catch(function(error){
                console.log(error)
            })
        })
    })
    .catch(function(er){
        console.log(er)
    })
}
/**
 * Hiiển thị thông tin lên form
 */
function hienThiThongLenForm(nv){
    getEle("TaiKhoan").value = nv.taiKhoan;
    getEle("HoTen").value = nv.hoTen;
    getEle("MatKhau").value = nv.matKhau;
    getEle("Email").value = nv.email;
    getEle("SoDienThoai").value = nv.soDT;
    getEle("loaiNguoiDung").value = nv.maLoaiNguoiDung;
}
/**
 * Reset Form
 */
function resetForm(){
    getEle("TaiKhoan").value = '';
    getEle("HoTen").value = '';
    getEle("MatKhau").value = '';
    getEle("Email").value = '';
    getEle("SoDienThoai").value = '';
    getEle("loaiNguoiDung").value = '';
}