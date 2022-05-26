using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Lab_9___ASP.NET.DataAbstractionLayer;

namespace Lab_9___ASP.NET.Controllers
{
    public class AddController : Controller
    {
        // GET: Add
        public ActionResult Index()
        {
            return View();
        }

        public bool Add()
        {
            string title = Request.Params["title"];
            string content = Request.Params["content"];
            string producer = Request.Params["producer"];
            string category = Request.Params["category"];

            DAL dal = new DAL();

            int user_id = dal.GetUserIdByName(Request.Params["username"]);

            bool result = dal.Add(title, content, producer, category, user_id);

            if (result)
            {
                Response.Redirect("~/NewsHome/Index");
            }

            return result;
        }
    }
}