$(document).ready(function () {
    $('#btn-customer').click(function () {
        $.ajax({
            url: "api/employees",
            method: "GET",
            dataType: "html",
            success: function (data) {
                debugger
                if (data) {
                    var employees = JSON.parse(data);

                    $('#show-info').click();
                    $('.my-index-table-body').empty();
                    $('.sum-of-total-items').empty().append(employees.length);
                    $.each(employees, function (index, item) {

                        //check for empty field
                        for (var property in item) {
                            if (item[property] === null) {
                                item[property] = "";
                            }
                            else {
                                if (property === 'NgaySinh') {

                                    //change date display format
                                    var str = item[property].substr(0, 10);
                                    var time = str.split('-');
                                    str = time[2] + '/' + time[1] + '/' + time[0];
                                    item[property] = str;
                                }
                            }
                        }

                        //append data to table
                        var info = '<tr count="true">'
                            + '<td>' + item['MaNhanVien'] + '</td>'
                            + '<td>' + item['HoVaTen'] + '</td>'
                            + '<td>' + item['GioiTinh'] + '</td>'
                            + '<td>' + item['NgaySinh'] + '</td>'
                            + '<td>' + item['DiaChi'] + '</td>'
                            + '<td>' + item['DienThoai'] + '</td>'
                            + '<td>' + item['Email'] + '</td>'
                            + '<td>' + item['ViTriCongViec'] + '</td>'
                            + '<td>' + item['DonViCongTac'] + '</td>'
                            + '</tr>';
                        $('.my-index-table-body').append(info);
                    });
                }
            },
            error: function (data) {

            },
            done: function (data) {

            },
            fail: function (data) {

            }
        });
    });

    $("#btn-load").click(function () {
        $("#btn-customer").click();
    });

    $("#save-btn").click(function () {
        $.ajax({
            url: 'api/employees',
            type: 'POST',
            data: $('#add-form-id').serialize(),

            success: function (data, textStatus, xhr) {
                alert("Thêm thành công mã nhân viên " + data.MaNhanVien + "");
                $("#pa-closeAddContent").click();
                $("#btn-customer").click();
            },

            error: function (xhr, textStatus, errorThrown) {
                if (xhr.status === 409) {
                    alert("Mã nhân viên này đã tồn tại!");
                }
                else {
                    alert("Lỗi server. Vui lòng thử lại!");
                }
            }
        });
    });

    $('.my-index-table-body').on("click", "tr", function (e) {
        var id = $(this).children().first().text();
        var id_url = 'api/employees?idParam=' + id;
        $.ajax({
            url: id_url,
            method: "GET",
            dataType: "html",
            success: function (data) {
                var employee = JSON.parse(data);
                for (var property in employee) {
                    if (employee[property] === null) {
                        employee[property] = "";
                    }
                    else {
                        if (property === 'NgaySinh') {

                            //change date display format
                            var str = employee[property].substr(0, 10);
                            var time = str.split('-');
                            str = time[2] + '/' + time[1] + '/' + time[0];
                            employee[property] = str;
                        }
                    }
                }

                //append data
                $('.info_MaNhanVien').empty().append(employee.MaNhanVien);
                $('.info_HoVaTen').empty().append(employee.HoVaTen);
                $('.info_NgaySinh').empty().append(employee.NgaySinh);
                $('.info_GioiTinh').empty().append(employee.GioiTinh);
                $('.info_DiaChi').empty().append(employee.DiaChi);
                $('.info_SoDienThoai').empty().append(employee.DienThoai);
                $('.info_Email').empty().append(employee.Email);
                $('.info_ViTriCongViec').empty().append(employee.ViTriCongViec);
                $('.info_DonViCongTac').empty().append(employee.DonViCongTac);
            }
        });
    });
});