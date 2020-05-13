# url-checker-with-email-notification-puppeteer
This is a node script that uses puppeteer to check weather a link is broken or not and then sends out an email as a notification if it is

## Steps to run the project
1. Clone this repository
2. Then, copy .env.demo to .env(new file) and fill out all the values
3. In files/urls.js, add the list of urls you want to check
4. Do an npm install
5. Now run the script with npm start. The time it runs for will depend on how many urls you put in. Once it stops, All the log of your run can be viewed in logs/latest.log file.

NOTE: if you get an error like this(most probably in windows)

UnhandledPromiseRejectionWarning: Error: Failed to launch the browser process! spawn **\**\node_modules\puppeteer.local-chromium\win64-737027\chrome-win\chrome.exe ENOENT

In this case, you need to go to \node_modules\puppeteer.local-chromium folder, there should be a zip file chrome-win.zip
Extract it to chrome-win folder and then copy that folder into win64-737027 folder which will be there in the .local-chromium folder. (It may ask to replace existing, say yes).
After this when you run, there should be no errors and you should recieve the email as well as the info of the last run can be found in logs/latest.log

## Schedule the script (Strictly for windows)
For running the script on schedule there are scripts in the sys_script folder,
In all the 3 files add the appropriate paths and the, double click on shedule.bat
The program will run twice daily at 8AM and 8PM
