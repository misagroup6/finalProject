$(document).ready(function () {
    $.ajax({
        url: "api/employees",
        method: "GET",
        dataType: "html",
        success: function (data) {
            debugger
            if (data) {
                var customers = JSON.parse(data);
                $.each(customers, function (index, item) {
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
                                str = time[2] + '-' + time[1] + '-' + time[0];
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

    $("#save-btn").click(function () {
        $("#add-form-id").submit();
    });
});