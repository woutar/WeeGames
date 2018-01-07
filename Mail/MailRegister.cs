using System;
using MailKit;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Utils;
using WeeGames.Models;

namespace WeeGames.Mail
{
    public class MailRegister{
        
        public static void Send(User details){
            var message = new MimeMessage ();
            message.From.Add (new MailboxAddress ("WeeGames", "weegamesshop@gmail.com"));
            message.To.Add (new MailboxAddress (details.Firstname, details.Email));
            message.Subject = "Succesfully Registered";

            var builder = new BodyBuilder ();

            // Set the plain-text version of the message text
            builder.TextBody = @"Dear " + details.Firstname + " " +  details.Lastname +  "," + 
            
            "Thank you for registereing at Weegames. Below you will find your register credentials" +

            "Login Email: " + details.Email +

            "Delivery address:" +
            details.Firstname + " " + details.Lastname +
            details.Address + 
            details.Zipcode + " " + details.City +
            details.Country + 

            "Happy shopping!" + 

            "Kind regards," + 

            "Weegames";

            // generate a Content-Id for the image we'll be referencing
            // var contentId = MimeUtils.GenerateMessageId ();

            // Set the html version of the message text

            builder.HtmlBody = string.Format (@"<p>Dear " + details.Firstname + " " +  details.Lastname + ",<br>" +
            "<p>Thank you for registereing at Weegames. Below you will find your register credentials<br>" +
            "<p>Login Email: " + details.Email + "<br>" +
            "<p>Delivery address:<br>" + 
            "<b><i>" + details.Firstname + " " + details.Lastname + "</i></b><br>" +
            "<i>" + details.Address + "</i><br>" +
            "<i>" + details.Zipcode + " " + details.City + "</i><br>" +
            "<i>" + details.Country + "</i><br>" +
            "<p>Happy shopping!" + 
            "<p>Kind regards,<br>" + 

            "<p>Weegames<br>");
            

            // For images
            
            // <center><img src=""cid:{0}"" alt=""creditcard.ico""></center>", contentId);
            // Since selfie.jpg is referenced from the html text, we'll need to add it
            // to builder.LinkedResources and then set the Content-Id header value
            // builder.LinkedResources.Add (@"C:\Users\Wouter\Documents\GitHub\WeeGames\wwwroot\images\creditcard.ico");
            // builder.LinkedResources[0].ContentId = contentId;


            // Now we just need to set the message body and we're done
            message.Body = builder.ToMessageBody ();

            using (var client = new SmtpClient ()) {
				// For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
				client.ServerCertificateValidationCallback = (s,c,h,e) => true;

				client.Connect ("smtp.gmail.com", 587, false);

				// Note: since we don't have an OAuth2 token, disable
				// the XOAUTH2 authentication mechanism.
				client.AuthenticationMechanisms.Remove ("XOAUTH2");

				// Note: only needed if the SMTP server requires authentication
				client.Authenticate ("weegamesshop@gmail.com", "Weegames123");

				client.Send (message);
                Console.WriteLine("The mail has been sent successfully !!"); 
				client.Disconnect (true);
                
			}
        }
    }
}