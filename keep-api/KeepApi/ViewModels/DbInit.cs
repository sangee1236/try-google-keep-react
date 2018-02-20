using System.Linq;

namespace KeepApi.ViewModels
{
    public class DbInit
    {
        public static void Initialize(KeepDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            var users = new User[]
            {
            new User{Email="carson@gmail.com"},
            new User{Email="meredith@outlook.com"},
            new User{Email="arturo@yahoo.com"},

            };
            foreach (User user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();

            var lists = new List[]
            {
            new List{UserId = 1, Title = "Carson Market", Status = "active"},
            new List{UserId = 1, Title = "Carson Veggies", Status = "active"},
            new List{UserId = 1, Title = "Carson Electronic", Status = "active"},
            new List{UserId = 3, Title = "Arturo Market", Status = "active"},
            new List{UserId = 2, Title = "Meredith Market", Status = "active"},
            new List{UserId = 2, Title = "Meredith Veggies", Status = "active"},
            new List{UserId = 3, Title = "Arturo Veggies", Status = "active"},

            };
            foreach (List lt in lists)
            {
                context.Lists.Add(lt);
            }
            context.SaveChanges();

            var items = new Item[]
            {
            new Item{ListId = 1, Name="item1", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 1, Name="item2", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 1, Name="item3", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 1, Name="item4", Price= 0.00m, Qty= 0,  Status="done"},
            new Item{ListId = 1, Name="item5", Price= 0.00m, Qty= 0,  Status="active"},

            new Item{ListId = 2, Name="item1", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 2, Name="item2", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 2, Name="item3", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 2, Name="item4", Price= 0.00m, Qty= 0,  Status="active"},

            new Item{ListId = 3, Name="item1", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 3, Name="item2", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 3, Name="item3", Price= 0.00m, Qty= 0,  Status="active"},


            new Item{ListId = 4, Name="item1", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 4, Name="item2", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 4, Name="item3", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 4, Name="item4", Price= 0.00m, Qty= 0,  Status="active"},

            new Item{ListId = 5, Name="item1", Price= 0.00m, Qty= 0,  Status="active"},
            new Item{ListId = 5, Name="item2", Price= 0.00m, Qty= 0,  Status="active"},

            };
            foreach (Item im in items)
            {
                context.Items.Add(im);
            }
            context.SaveChanges();

            var labels = new Label[]
            {
            new Label{Name="Red", UserId=1, Status= "active"},
            new Label{Name="Yellow", UserId=1, Status= "active"},
            new Label{Name="Green", UserId=1, Status= "active"},

            new Label{Name="Low", UserId=2, Status= "active"},
            new Label{Name="Medium", UserId=2, Status= "active"},
            new Label{Name="High", UserId=2, Status= "active"},

            new Label{Name="Not now", UserId=3, Status= "active"},
            new Label{Name="Urgent", UserId=3, Status= "active"},
            new Label{Name="Later", UserId=3, Status= "active"},


            };
            foreach (Label lbl in labels)
            {
                context.Labels.Add(lbl);
            }
            context.SaveChanges();


            //context.AddRange(
            //    new ListLabel { List = lists[0], Label = labels[0] },
            //    new ListLabel { List = lists[0], Label = labels[1] },
            //    new ListLabel { List = lists[1], Label = labels[2] },
            //    new ListLabel { List = lists[1], Label = labels[4] },
            //    new ListLabel { List = lists[2], Label = labels[5] },
            //    new ListLabel { List = lists[2], Label = labels[7] },
            //    new ListLabel { List = lists[2], Label = labels[8] },
            //    new ListLabel { List = lists[2], Label = labels[9] });
            //context.SaveChanges();
        }
    }
}



