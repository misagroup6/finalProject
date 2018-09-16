using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using EmployeeDataAccess;

namespace MISA_WDT_HeroDev_Nhom6.Controllers
{
    public class EmployeesController : ApiController
    {
        //Request employee infomation
        public IEnumerable<Employee> Get()
        {
            using (EmployeeDBEntities entities = new EmployeeDBEntities())
            {
                return entities.Employees.OrderByDescending(e => e.ID).ToList();
            }
        }

        public HttpResponseMessage Get(string IDparam)
        {
            using (EmployeeDBEntities entities = new EmployeeDBEntities())
            {
                var entity = entities.Employees.FirstOrDefault(e => e.MaNhanVien == IDparam);
                if(entity != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Ma nhan vien " + IDparam + " khong ton tai");
                }
            }
        }

        
        //Add new employee to database
        public HttpResponseMessage Post([FromBody]Employee employee)
        {
            try
            {
                //Check if this id exists
                HttpResponseMessage resultEmployee = Get(employee.MaNhanVien);
                if ((int) resultEmployee.StatusCode != 200)
                { 
                    //save new employee to database
                    using (EmployeeDBEntities entities = new EmployeeDBEntities())
                    {
                        entities.Employees.Add(employee);
                        entities.SaveChanges();
                    }
                }

                //Redirect to home page
                string rootUrl = HttpContext.Current.Request.Url.Authority;
                var response = Request.CreateResponse(HttpStatusCode.Moved);
                response.Headers.Location = new Uri("http://" + rootUrl + "/index.html");
                return response;
            }

            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
