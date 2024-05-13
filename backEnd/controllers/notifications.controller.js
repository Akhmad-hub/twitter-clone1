import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ to: userId }, { rea: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Eror in getNotifications contrroller ", error.message);
    res.status(500).json({ error: "Internal  Serrver Eror" });
  }
};

export const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "notifications deleted successfully" });
  } catch (error) {
    console.log("Eror in deleteNotification contrroller ", error.message);
    res.status(500).json({ error: "Internal  Serrver Eror" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const notificationId = req.params._id;
    const userId = req.user._id;
    const notifications = await Notification.findById(notificationId);
    if (!notifications) {
      return res.status(404).json({ message: "notification not found" });
    }

    if(notifications.to.toString() !== userId.toString()){
      return res.status(401).json({ message: "you are deleting not your notification" });
    }


    await Notification.findbyIdAndDelete(notificationId);
    res.status(200).json({ message: "notification deleted successfully" });
  } catch (error) {}
};
