using System;
using System.Reflection;

namespace MISA_WDT_HeroDev_Nhom6.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}