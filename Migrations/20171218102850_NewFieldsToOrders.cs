using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WeeGames.Migrations
{
    public partial class NewFieldsToOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Methodinfo",
                table: "Orders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Paymentmethod",
                table: "Orders",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Methodinfo",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Paymentmethod",
                table: "Orders");
        }
    }
}
