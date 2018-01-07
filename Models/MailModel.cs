using System;
using System.Collections.Generic;
using WeeGames.Models;

public class OrderDetails{
    public string Email {get;set;}
    public string Firstname {get;set;}
    public string Lastname {get;set;}
    public string Address {get;set;}
    public string City {get;set;}
    public string Zipcode {get;set;}
    public string Country {get;set;}
    public DateTime OrderDate {get;set;}
    public string PaymentMethod {get; set;}
    public string MethodInfo {get; set;}
    public string Status {get; set;}
    public List<MailItem> MailItems {get;set;}
    public double Total {get;set;}
}

public class MailItem{
    public string Name {get;set;}
    public double Price {get;set;}
    public int Quantity {get;set;}
}