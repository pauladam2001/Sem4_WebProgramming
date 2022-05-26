using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Lab_9___ASP.NET.DataAbstractionLayer;
using Lab_9___ASP.NET.Models;
using MySql.Data.Types;

namespace Lab_9___ASP.NET.Controllers
{
    public class NewsHomeController : Controller
    {
        // GET: NewsHome
        public ActionResult Index()
        {
            return View();
        }

        public string GetNews()
        {
            DAL dal = new DAL();
            List<News> newsList = dal.GetNews();

            int user_id = dal.GetUserIdByName(Request.Params["username"]);

            string result = "<table class=\"table\"><thead><th>Title</th><th>Content</th><th>Producer</th><th>Category</th><th>Date</th></thead>";

            int counter = 0;

            foreach (News news in newsList)
            {
                result += "<tr><td>" + news.title + "</td><td>" + news.content + "</td><td>" + news.producer + "</td><td>" + news.category + "</td><td>" + news.date + "</td>";

                if (user_id == news.user_id)
                {
                    result += "<td><form method=\"POST\" action=\"/Update/Index\">";
                    result += "<button type=\"submit\" id=\"" + counter + "\" name=\"edit\" value=\"" + news.title + "\" onClick=\"setSession(this.id)\"> Edit </button>";
                    result += "</form></td>";
                }

                result += "</tr>";

                counter++;
            }

            result += "</table>";

            return result;
        }

        public string GetCategories()
        {
            DAL dal = new DAL();
            List<string> categoriesList = dal.GetCategories();

            string result = "";

            foreach (string category in categoriesList)
            {
                result += "<option>" + category + "</option>";
            }

            return result;
        }

        public string GetDates()
        {
            DAL dal = new DAL();
            List<MySqlDateTime> datesList = dal.GetDates();

            string result = "";

            foreach (MySqlDateTime date in datesList)
            {
                result += "<option>" + date + "</option>";
            }

            return result;
        }

        public string GetNewsByCategory()
        {
            string category = Request.Params["category"];

            DAL dal = new DAL();
            List<News> newsList = dal.GetNewsByCategory(category);

            int user_id = dal.GetUserIdByName(Request.Params["username"]);

            string result = "<table><thead><th>Title</th><th>Content</th><th>Producer</th><th>Category</th><th>Date</th></thead>";

            int counter = 0;

            foreach (News news in newsList)
            {
                result += "<tr><td>" + news.title + "</td><td>" + news.content + "</td><td>" + news.producer + "</td><td>" + news.category + "</td><td>" + news.date + "</td>";

                if (user_id == news.user_id)
                {
                    result += "<td><form method=\"POST\" action=\"/Update/Index\">";
                    result += "<button type=\"submit\" id=\"" + counter + "\" name=\"edit\" value=\"" + news.title + "\" onClick=\"setSession(this.id)\"> Edit </button>";
                    result += "</form></td>";
                }

                result += "</tr>";

                counter++;
            }

            result += "</table>";

            return result;
        }

        public string GetNewsByDate()
        {
            string date = Request.Params["date"];
            DateTime dateTime = DateTime.Parse(date);

            DAL dal = new DAL();
            List<News> newsList = dal.GetNewsByDate(dateTime);

            int user_id = dal.GetUserIdByName(Request.Params["username"]);

            string result = "<table><thead><th>Title</th><th>Content</th><th>Producer</th><th>Category</th><th>Date</th></thead>";

            int counter = 0;

            foreach (News news in newsList)
            {
                result += "<tr><td>" + news.title + "</td><td>" + news.content + "</td><td>" + news.producer + "</td><td>" + news.category + "</td><td>" + news.date + "</td>";

                if (user_id == news.user_id)
                {
                    result += "<td><form method=\"POST\" action=\"/Update/Index\">";
                    result += "<button type=\"submit\" id=\"" + counter + "\" name=\"edit\" value=\"" + news.title + "\" onClick=\"setSession(this.id)\"> Edit </button>";
                    result += "</form></td>";
                }

                result += "</tr>";

                counter++;
            }

            result += "</table>";

            return result;
        }
    }
}