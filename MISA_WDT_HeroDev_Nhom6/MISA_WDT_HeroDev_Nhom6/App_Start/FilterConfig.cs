using System.Web;
using System.Web.Mvc;

namespace MISA_WDT_HeroDev_Nhom6
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
