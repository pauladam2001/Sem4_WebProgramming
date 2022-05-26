using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using MySql.Data.Types;

namespace Lab_9___ASP.NET.Models
{
    public class News
    {
        public string title { get; set; }
        public string content { get; set; }
        public string producer { get; set; }
        public string category { get; set; }
        public MySqlDateTime date { get; set; }
        public int user_id { get; set; }
    }
}