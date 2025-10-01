const User = require('../model/User')
const emailService = require("./emailService")
const moment = require("moment")

const sendBirthdayEmails = async () => {
  try {
    // Today's date:
    const today = moment().format('MM-DD');
    const [monthStr, dayStr] = today.split('-');
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const currentTime = `${hours}:${formattedMinutes}`;
    console.log(`${currentTime} Birthday job running for month=${month}, day=${day}`);


    const birthdayUsers = await User.find({
      isEmailed: false,
      $expr: {
        $and: [
          { $eq: [{ $month: '$dateOfBirth' }, month] },
          { $eq: [{ $dayOfMonth: '$dateOfBirth' }, day] }
        ]
      }
    });
    
    if (birthdayUsers.length === 0) {
      console.log(`${currentTime} No birthdays today`);
      return;
    }
    if (birthdayUsers.length === 1) {
        console.log (`${currentTime} Found ${birthdayUsers.length} birthday today`)
    } else if (birthdayUsers.length > 1){
        console.log(`${currentTime} Found ${birthdayUsers.length} birthday(s) today`);
    }
    

    const results = await Promise.all(
      birthdayUsers.map(async (user) => {
        const sent = await emailService.sendBirthdayEmail(user);
        if (sent) {
          try {
            await User.updateOne({ _id: user._id }, { $set: { isEmailed: true } });
          } catch (e) {
            console.error(`Failed to update isEmailed for ${user.email}:`, e);
          }
        }
        return sent;
      })
    );

    const successfulSends = results.filter(result => result).length;
    console.log(`Successfully sent ${successfulSends} out of ${birthdayUsers.length} birthday emails`);
    
  } catch (error) {
    console.error('Error in birthday email job:', error);
  }
};

module.exports = sendBirthdayEmails