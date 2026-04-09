/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import socket.ProfileService;
import util.HibernateUtil;


@MultipartConfig
@WebServlet(name = "UserController", urlPatterns = {"/UserController"})
public class UserController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        String firstname = request.getParameter("firstName");        
        String lastName = request.getParameter("lastName");
        String countryCode = request.getParameter("countryCode");
        String contactNo = request.getParameter("contactNo");
        Part profileImage = request.getPart("profileImage");
        
        JsonObject responseObject = new JsonObject();
        
        Gson gson = new Gson();
        
        responseObject.addProperty("status", false);
        
        if (firstname.isEmpty()) {
            
            responseObject.addProperty("message", "First name is required");
            
        }else if(lastName.isEmpty()){
            
            responseObject.addProperty("message", "Last name is required");
            
        }else if(countryCode.isEmpty()){
            
            responseObject.addProperty("message", "Country code is required");
            
        }else if(contactNo.isEmpty()){
            
            responseObject.addProperty("message", "Contact number is required");
            
        }else if(profileImage == null){
            
            responseObject.addProperty("message", "Profile image is required");
            
        }else{
            
            Session s = HibernateUtil.getSessionFactory().openSession();
            
            Criteria c1 = s.createCriteria(User.class);
            c1.add(Restrictions.eq("countryCode", countryCode));
            c1.add(Restrictions.eq("contactNo", contactNo));
            
            User user = (User) c1.uniqueResult();
            
            {
            if (user != null) {
                user.setFirstName(firstname);
                user.setLastName(lastName);
                
                s.update(user);
                
            } else {
                user = new User(firstname, lastName, countryCode, contactNo);
                user.setCreatedAt(new Date());
                user.setUpdatedAt(new Date());
               


                user.setId(((int) s.save(user)));
            }
                Transaction tr = s.beginTransaction();
                tr.commit();
                s.close();

                responseObject.add("user", gson.toJsonTree(user));

                new ProfileService().saveProfileImage(user.getId(), request);
               
                responseObject.addProperty("status", true);
                responseObject.addProperty("userId", user.getId());
            }
            
        }
        
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
        
    }    

}
