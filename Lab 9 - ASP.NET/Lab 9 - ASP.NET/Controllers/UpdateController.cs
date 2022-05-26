using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Lab_9___ASP.NET.DataAbstractionLayer;

namespace Lab_9___ASP.NET.Controllers
{
    public class UpdateController : Controller
    {
        // GET: Update
        public ActionResult Index()
        {
            return View();
        }

        public bool Update()
        {
            string title = Request.Params["title"];
            string content = Request.Params["content"];
            string producer = Request.Params["producer"];
            string category = Request.Params["category"];

            DAL dal = new DAL();

            string oldTitle = Request.Params["oldTitle"];

            bool result = dal.Update(title, content, producer, category, oldTitle);

            if (result)
            {
                Response.Redirect("~/NewsHome/Index");
            }

            return result;
        }
    }
}