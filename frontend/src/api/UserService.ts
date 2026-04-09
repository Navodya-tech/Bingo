import { useContext } from "react";
import { UserRegistrationData, useUserRegistration } from "../components/UserContext";
import { AuthContext } from "../components/AuthProvider";

const API = process.env.EXPO_PUBLIC_APP_URL + "/ChatApp";

export const createNewAccount = async (userRegistrationData: UserRegistrationData) => {

    console.log(API);

    let formData = new FormData();

    formData.append("firstName", userRegistrationData.firstName);
    formData.append("lastName", userRegistrationData.lastName);
    formData.append("countryCode", userRegistrationData.countryCode);
    formData.append("contactNo", userRegistrationData.contactNo);
    formData.append("profileImage", {

        uri: userRegistrationData.profileImage,
        name: "profile.png",
        type: "image/png",

    } as any);

    const response = await fetch(API + "/UserController", {

        method: "POST",
        body: formData,
        headers: {

            "Content-Type": "multipart/form-data"

        },

    });

    console.log(response);

    if (response.ok) {

        const json = await response.json();

        return json;

    } else {

        return "OOPS! Account creation failed!";

    }

};

export const uploadProfileImage = async (userId:string, imageUri: string) => {    

    let formData = new FormData();

    formData.append("userId", userId);
    formData.append("profileImage", {

        uri: imageUri,
        type:"image/png", //change if png
        name:"profile.png",

    } as any);

    const response = await fetch(
        API + "/ProfileController",
        {

            method: "POST",
            body: formData,

        }
    );

    if (response.ok) {

        return await response.json();

    } else {

        console.warn("Profile image uploading failed!");

    }

}
