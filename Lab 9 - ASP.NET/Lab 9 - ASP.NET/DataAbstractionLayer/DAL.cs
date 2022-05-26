using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Lab_9___ASP.NET.Models;
using MySql.Data.MySqlClient;
using MySql.Data.Types;

namespace Lab_9___ASP.NET.DataAbstractionLayer
{
    public class DAL
    {
        public bool Login(string username, string password)
        {
            MySqlConnection conn;
            string myConnectionString;

            myConnectionString = "server=localhost;database=newsservice;uid=root;";
            List<User> userList = new List<User>();

            try
            {
                conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "SELECT * FROM user WHERE username = @Username AND password = @Password";

                cmd.Parameters.AddWithValue("@Username", username);
                cmd.Parameters.AddWithValue("@Password", password);

                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    User user = new User();
                    user.username = myreader.GetString("username");
                    userList.Add(user);
                }

                myreader.Close();
                conn.Close();
            }
            catch (MySqlException e)
            {
                Console.Write(e.Message);
            }

            return userList.Count == 1;
        }

        public bool Register(string username, string password)
        {
            MySqlConnection conn;
            string myConnectionString;

            myConnectionString = "server=localhost;database=newsservice;uid=root;";

            try
            {
                conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "INSERT INTO user (username, password) VALUES (@Username, @Password)";

                cmd.Parameters.AddWithValue("@Username", username);
                cmd.Parameters.AddWithValue("@Password", password);

                int command = cmd.ExecuteNonQuery();

                conn.Close();

                return command == 1;
            }
            catch (MySqlException e)
            {
                Console.Write(e.Message);
            }

            return false;
        }

        public List<News> GetNews()
        {
            MySqlConnection conn;
            string myConnectionString;

            myConnectionString = "server=localhost;database=newsservice;uid=root;";
            List<News> newsList = new List<News>();

            try
            {
                conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "SELECT * FROM news ORDER BY date DESC";

                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    News news = new News();
                    news.title = myreader.GetString("title");
                    news.content = myreader.GetString("content");
                    news.producer = myreader.GetString("producer");
                    news.category = myreader.GetString("category");
                    news.date = myreader.GetMySqlDateTime("date");
                    news.user_id = myreader.GetInt16("user_id");

                    newsList.Add(news);
                }

                myreader.Close();
            }
            catch (MySqlException e)
            {
                Console.Write(e.Message);
            }

            return newsList;
        }

        public bool Add(string title, string content, string producer, string category, int user_id)
        {
            MySqlConnection conn;
            string myConnectionString;

            myConnectionString = "server=localhost;database=newsservice;uid=root;";

            try
            {
                conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "INSERT INTO news(title, content, producer, category, date, user_id) VALUES (@Title, @Content, @Producer, @Category, @Date, @User_id)";

                cmd.Parameters.AddWithValue("@Title", title);
                cmd.Parameters.AddWithValue("@Content", content);
                cmd.Parameters.AddWithValue("@Producer", producer);
                cmd.Parameters.AddWithValue("@Category", category);
                cmd.Parameters.AddWithValue("@Date", DateTime.Today);
                cmd.Parameters.AddWithValue("@User_id", user_id);

                int command = cmd.ExecuteNonQuery();

                conn.Close();

                return command == 1;
            }
            catch (MySqlException e)
            {
                Console.Write(e.Message);
            }

            return false;
        }

        public bool Update(string title, string content, string producer, string category, string oldTitle)
        {
            MySqlConnection conn;
            string myConnectionString;

            myConnectionString = "server=localhost;database=newsservice;uid=root;";

            try
            {
                conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "UPDATE news SET content = @Content, title=@Title, producer=@Producer, category=@Category WHERE title = @OldTitle";

                cmd.Parameters.AddWithValue("@Title", title);
                cmd.Parameters.AddWithValue("@Content", content);
                cmd.Parameters.AddWithValue("@Producer", producer);
                cmd.Parameters.AddWithValue("@Category", category);
                cmd.Parameters.AddWithValue("@OldTitle", oldTitle);

                int command = cmd.ExecuteNonQuery();

                conn.Close();

                return command == 1;
            }
            catch (MySqlException e)
            {
                Console.Write(e.Message);
            }

            return false;
        }

        public int GetUserIdByName(string username)
        {
            MySqlConnection conn;
            string myConnectionString;

            myConnectionString = "server=localhost;database=newsservice;uid=root;";
            int id = 0;

            try
            {
                conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "SELECT * FROM user WHERE username='" + username + "'";

                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    id = myreader.GetInt16("ID");
                }

                myreader.Close();
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return id;
        }

        public List<string> GetCategories()
        {
            MySqlConnection conn;
            string myConnectionString;

            myConnectionString = "server=localhost;database=newsservice;uid=root;";
            List<string> categoriesList = new List<string>();

            try
            {
                conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "SELECT DISTINCT category FROM news";

                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    categoriesList.Add(myreader.GetString("category"));
                }

                myreader.Close();
            }
            catch (MySqlException e)
            {
                Console.Write(e.Message);
            }

            return categoriesList;
        }

        public List<MySqlDateTime> GetDates()
        {
            MySqlConnection conn;
            string myConnectionString;

            myConnectionString = "server=localhost;database=newsservice;uid=root;";
            List<MySqlDateTime> datesList = new List<MySqlDateTime>();

            try
            {
                conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "SELECT DISTINCT date FROM news";

                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    datesList.Add(myreader.GetMySqlDateTime("date"));
                }

                myreader.Close();
            }
            catch (MySqlException e)
            {
                Console.Write(e.Message);
            }

            return datesList;
        }

        public List<News> GetNewsByCategory(string category)
        {
            MySqlConnection conn;
            string myConnectionString;

            myConnectionString = "server=localhost;database=newsservice;uid=root;";
            List<News> newsList = new List<News>();

            try
            {
                conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "SELECT * FROM news WHERE category = @Category ORDER BY date DESC";

                cmd.Parameters.AddWithValue("@Category", category);

                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    News news = new News();
                    news.title = myreader.GetString("title");
                    news.content = myreader.GetString("content");
                    news.producer = myreader.GetString("producer");
                    news.category = myreader.GetString("category");
                    news.date = myreader.GetMySqlDateTime("date");
                    news.user_id = myreader.GetInt16("user_id");

                    newsList.Add(news);
                }

                myreader.Close();
            }
            catch (MySqlException e)
            {
                Console.Write(e.Message);
            }

            return newsList;
        }

        public List<News> GetNewsByDate(DateTime date)
        {
            MySqlConnection conn;
            string myConnectionString;

            myConnectionString = "server=localhost;database=newsservice;uid=root;";
            List<News> newsList = new List<News>();

            try
            {
                conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "SELECT * FROM news WHERE date = @Date ORDER BY date DESC";

                cmd.Parameters.AddWithValue("@Date", date);

                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    News news = new News();
                    news.title = myreader.GetString("title");
                    news.content = myreader.GetString("content");
                    news.producer = myreader.GetString("producer");
                    news.category = myreader.GetString("category");
                    news.date = myreader.GetMySqlDateTime("date");
                    news.user_id = myreader.GetInt16("user_id");

                    newsList.Add(news);
                }

                myreader.Close();
            }
            catch (MySqlException e)
            {
                Console.Write(e.Message);
            }

            return newsList;
        }
    }
}