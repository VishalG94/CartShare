package edu.sjsu.cmpe275.project.CartShare.utils;

public class EmailUtility {

    public static final String URL = "http://localhost:3000";
    public static String URL_PREFIX = URL + "/verifyaccount/";
    public static final String VERIFICATION_SUCCESS_MESSAGE = "Congratulations.!! Account verified successfully";

    public static String createVerificationMsg(Long verificationcode) {
        String verificationMessage = "Thank you for registration with Cartshare !!!\nPlease verify your account"
                + " by clicking the url.\n" + "\nUrl : " + URL_PREFIX + verificationcode
                + "\n\nRegards\nTeam Cartshare";
        System.out.println("verificationMessage : " + verificationMessage);
        return verificationMessage;
    }

    public static String createPoolRequestReceived(String initiater, String approver) {
        String notifyMessage = "Hi " + approver + ",\n\nYou have received a request from " + initiater
                + " to join the pool!!!" + "\n\nRegards,\nTeam Cartshare";
        System.out.println("notifyMessage : " + notifyMessage);
        return notifyMessage;
    }

    public static String messageNotification(String sender, String receiver, String msg) {
        String notifyMessage = "Hi " + receiver + ",\n\nYou have received below message from your fellow pooler "
                + sender + ":\n\n" + msg + "\n\nRegards,\nTeam Cartshare";
        System.out.println("notifyMessage : " + notifyMessage);
        return notifyMessage;
    }
}