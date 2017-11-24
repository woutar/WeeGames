using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WeeGames.Migrations
{
    public partial class addedwishlistWeeGamesDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WishlistId",
                table: "WishlistItem",
                type: "int4",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WishlistItem_WishlistId",
                table: "WishlistItem",
                column: "WishlistId");

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistItem_Wishlist_WishlistId",
                table: "WishlistItem",
                column: "WishlistId",
                principalTable: "Wishlist",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishlistItem_Wishlist_WishlistId",
                table: "WishlistItem");

            migrationBuilder.DropIndex(
                name: "IX_WishlistItem_WishlistId",
                table: "WishlistItem");

            migrationBuilder.DropColumn(
                name: "WishlistId",
                table: "WishlistItem");
        }
    }
}
