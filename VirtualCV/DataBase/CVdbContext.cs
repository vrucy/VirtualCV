using VirtualCV.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VirtualCV.DataBase
{
    public class CVdbContext : DbContext
    {
        public CVdbContext( DbContextOptions<CVdbContext> options) : base(options) {}

        public DbSet<Position> Postions { get; set; }
        public DbSet<Questions> Questions{ get; set; }
        public DbSet<QuestionType> QuestionTypes{ get; set; }
        public DbSet<Client> Clients{ get; set; }
        public DbSet<Answer> Answers{ get; set; }
        public DbSet<Component> Components { get; set; }
        public DbSet<Administrator> Administrators{ get; set; }
        public DbSet<QuestionPosition> QuestionPositions{ get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<QuestionPosition>()
                .HasKey(x => new { x.PositionId, x.QuestionId });

            modelBuilder.Entity<QuestionPosition>()
                .HasOne(q => q.Questions)
                .WithMany(x => x.QuestionPositions)
                .HasForeignKey(q => q.QuestionId);

            modelBuilder.Entity<QuestionPosition>()
                .HasOne(q => q.Positions)
                .WithMany(x => x.QuestionPositions)
                .HasForeignKey(q => q.PositionId);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}
