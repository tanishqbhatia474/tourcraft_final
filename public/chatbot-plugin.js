(function () {
    // Default configuration
    const defaultConfig = {
        chaticon: {
            position: 'right',
            icon_color: 'black',
            icon_background_color: 'white'
        },
        chatbotWindow: {
            headerBackgroundColor: 'black',
            headerTextColor: 'white',
            bodyBackgroundColor: 'white',
            bodyTextColor: 'black',
        },
        personaId: null,
        privateKey: null
    };

    // Merge default config with user config
    const config = { ...defaultConfig, ...window.userChatbotConfig };

//     const otpless = `const callback = async (userinfo) => {

//             const mobileMap = otplessUser.identities.find(
//                 (item) => item.identityType === "MOBILE"
//             )?.identityValue;
//             const token = otplessUser.token;

//             const mobile = mobileMap?.identityValue;

//             const name = mobileMap?.name;

//              window.sessionStorage.setItem('hyperleapotp', JSON.stringify({
//                         otpless: userinfo
//                     }))
//             // userinfoHyp = userinfo
            

//             // Implement your custom logic here.
//         };
//         // Initialize OTPLESS SDK with the defined callback.
//         const OTPlessSignin = new OTPless(callback);

//         const phoneAuth = async ({
//             phone, countryCode
//         }) => {

//             const res = await OTPlessSignin.initiate({
//                 channel: "PHONE",
//                 phone: phone,
//                 countryCode: "+" + countryCode,
//             });
//             return res.success
//         };
//         const verifyOTP = async ({
//             phone, countryCode, otp
//         }) => {

//             const res = await OTPlessSignin.verify({
//                 channel: "PHONE",
//                 phone: countryCode.toString() + phone.toString(),
//                 otp: otp,
//                 countryCode: "+" + countryCode,
//             });
//             return res.success
//         };
// `
//     const otpElement = document.createElement('script');
//     otpElement.textContent = otpless;
//     document.head.appendChild(otpElement);

    // var link = document.createElement('link');
    // // Set the attributes for the link element
    // link.rel = 'stylesheet';
    // link.href = '/style.css';
    // // Append the link element to the head
    // document.head.appendChild(link);

    var style = document.createElement('style');

    style.textContent = `@media screen and (max-width: 480px) {
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #hyperleap-chatbot-message {
            display: none;
        }

        #hyperleap-chatbot-chat {
            display: none;
        }

        #hyperleap-chatbot-toggle-button {
            border: 2px solid transparent;
            box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.4);
            background-color: ${config.chaticon.icon_background_color};
            border-radius: 50%;
            color: ${config.chaticon.icon_color};
            padding: 10px;
            margin-left: auto;
            width: max-content;
            cursor: pointer;
            position: fixed;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            bottom: 14px;
            ${config.chaticon.position == 'right' ? 'right: 14px;' : 'left: 14px;'};
            z-index: 9999;
        }

        #down-arrow {
            display: none;
        }

        #hyperleap-chatbot-window {
            width: 100vw;
            height: 100vh;
            background-color: ${config.chatbotWindow.bodyBackgroundColor};
            position: fixed;
            overflow: hidden;
            top: 0;
            left: 0;
            z-index: 99999;
            display: none;
        }

        #hyperleap-cross-icon {
            position: fixed;
            right: 20px;
            top: 20px;
            cursor: pointer;
            height: 30px;
            display: flex;
            color: white;
            justify-content: center;
            align-items: center;
            width: 30px;
            z-index: 100;
            border-radius: 50%;
        }

        #hyperleap-cross-icon:active {
            background-color: rgba(150, 149, 149, 0.493);
        }

        #hyperleap-chatbot-auth {
            position: relative;
            width: 100vw;
            height: 100vh;
        }



        .hyperleap-header {
            background-color: ${config.chatbotWindow.headerBackgroundColor};
            height: 45%;
            position: relative;
            width: 100%;

            display: flex;
            justify-content: start;
            align-items: end;
        }

        .hyperleap-header-logo {
            position: fixed;
            left: 6%;
            top: 20px;
            cursor: pointer;
            height: 30px;
            object-fit: contain;
            display: flex;
            color: wheat;
            justify-content: center;
            align-items: center;
            width: 30px;
            z-index: 100;
        }

        .hyperleap-header-title {
            font-size: 32px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-weight: 700;
            line-height: 38px;
            margin: 0 6%;
            margin-bottom: 10%;
            color: ${config.chatbotWindow.headerTextColor};
            text-shadow: rgba(255, 255, 255, 0.3) 0px 0px 30px;
        }

        #hyperleap-chatbot-window-body-auth {
            position: relative;
            height: 50%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #hyperleap-otp-form {
            display: none;
        }

        .hyperleap-auth-form {
            width: 80%;
            height: max-content;
            color:${config.chatbotWindow.bodyTextColor};
            display: flex;
            justify-content: center;
            gap: 4px;
            align-items: start;
            flex-direction: column;
            font-size: 18px;
            /* height: 100%; */
        }

        .hyperleap-auth-input {
            border: 1px solid black;
            margin-top: 1px;
            font-size: 20px;
            border-radius: 5px;
            padding: 10px 7%;
            margin-bottom: 10px;
            width: 100%;
            max-width: 100%;
        }

        #hyperleap-auth-phone {
            border: 1px solid black;
            margin-top: 1px;
            font-size: 20px;
            border-radius: 5px;
            padding: 10px 7%;

            padding-left: 50px;
            margin-bottom: 10px;
            width: 80vw;
            /* max-width: 100%; */
        }

        #hyperleap-auth-send-otp-button {
            border: 0px solid black;
            border-radius: 5px;
            padding: 12px 20px;
            cursor:pointer;
            font-size: 20px;
            background-color: ${config.chatbotWindow.headerBackgroundColor};
            width: 100%;
            margin-top: 10px;
            color: ${config.chatbotWindow.headerTextColor};
        }

        #hyperleap-auth-otp-verify-button {
            border: 0px solid black;
            border-radius: 5px;
            padding: 12px 20px;
              cursor:pointer;
            font-size: 20px;
            background-color: ${config.chatbotWindow.headerBackgroundColor};
            width: 100%;
            margin-top: 2px;
            color: ${config.chatbotWindow.headerTextColor};
        }


        #hyperleap-chatbot-chat {
            position: relative;
            width: 100vw;
            height: 100%;
            max-height: dvh;
        }

        #hyperleap-chatbot-window-header-chat {
            background-color: ${config.chatbotWindow.headerBackgroundColor};
            /* padding-top: 80px; */
            height: 20%;
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: end;
        }

        #hyperleap-chatbot-window-header-title {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-weight: 700;
            margin: 0 6%;
            margin-bottom: 7%;
            color: ${config.chatbotWindow.headerTextColor};
            text-shadow: rgba(255, 255, 255, 0.3) 0px 0px 30px;
            font-size: 26px;
            line-height: 28px;
            opacity: 0.8;

        }

        #hyperleap-chatbot-window-body-chat {
            position: relative;
            height: 80%;
            overflow-y: auto;
        }


        #hyperleap-chatbot-chats {
            height: 100%;
            overflow-y: auto;
            display: flex;
            gap: 16px;
            flex-direction: column;
        }

        .hyperleap-user-chat {
            max-width: 80%;
            display: flex;
            margin-right: 10px;
            gap: 5px;
            margin-left: auto;
            justify-content: end;
        }

        .hyperleap-assistant-chat {
            max-width: 80%;
            display: flex;
            margin-left: 10px;

            gap: 5px;
            align-items: end;
        }

        .hyperleap-chat {
            font-size: 14px;
            line-height: 1.4;
            font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }


        .hyperleap-chat:first-child {
            margin-top: 10px;
        }

        .hyperleap-chat:last-child {
            margin-bottom: 120px;
        }

        .hyperleap-assistant-chat-logo {
            border: 1px solid gray;
            height: 35px;
            padding: 0 3px;
            border-radius: 4px;
            width: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(252, 252, 252, 0.958);
        }

        .hyperleap-assistant-chat-content {
            background-color: rgb(242, 242, 242);
            padding: 17px 20px;
            border-radius: 10px;
            max-width: 80%;
        }

        .hyperleap-user-chat-content {
            background-color: ${config.chatbotWindow.headerBackgroundColor};
            color: ${config.chatbotWindow.headerTextColor};
            padding: 17px 20px;
            border-radius: 10px;
            max-width: 100%;
        }

        .hyperleap-chat-footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            display: flex;
            justify-content: center;
        }

        .hyperleap-chat-input {
            margin: auto;
            display: flex;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
            cursor: pointer;
            background-color: white;
            color: black;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin: 0 auto;
            box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 2px 8px;

        }

        .hyperleap-chat-conversation-input {
            background-color: transparent;
            height: 56px;
            border: 0;
            width: 85%;
            line-height: 21px;
            font-size: 17px;
            padding: 0 10px;
            touch-action: none;
            outline: none;
        }

        #chat-conversation-input-button {
            height: 56px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: 0;
            width: 15%;
            z-index: 10;
        }

        #chat-conversation-input-button:active {
            background-color: #0000002a;
        }

        #chat-back-button:hover {
            background-color: #d9d1d17a;
            border-radius: 50%;
        }

        #hyperleap-chatbot-window-footer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            position: absolute;
            bottom: 0;
            font-size: 14px;
            /* border-radius: 0 0 8px 8px; */
            height: 14%;
            width: 100%;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 25px;

        }

        .chatbot-footer-button {
            height: 100%;
            width: 100%;
            display: flex;
            border: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            background-color: white;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            cursor: pointer;
        }


        .chatbot-footer-button:hover {
            background-color: #0000002a;
        }
               .hyperleap-header-logo-image{
            width: 55px;
            height: 55px;
            object-fit: contain;
            }
    }

    @media screen and (min-width: 480px) {
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #hyperleap-chatbot-message {
            display: none;
        }
            .hyperleap-header-logo-image{
            width: 55px;
            height: 55px;
            object-fit: contain;
            }

        #hyperleap-chatbot {
            position: fixed;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            bottom: 18px;
            ${config.chaticon.position == 'right' ? 'right: 18px;' : 'left: 18px;'};
        }

        #hyperleap-chatbot-chat {
            display: none;
        }

        #hyperleap-chatbot-toggle-button {
            border: 2px solid transparent;
            box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.4);
            background-color: ${config.chaticon.icon_background_color};
            border-radius: 50%;
            color: ${config.chaticon.icon_color};

            padding: 10px;
            margin: 10px;

            ${config.chaticon.position == 'right' ? 'margin-left: auto;' : 'margin-right: auto;'};

            width: max-content;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            z-index: 99999;
        }

        #down-arrow {
            display: none;
        }

        #hyperleap-chatbot-window {
            width: 400px;
            height: 80vh;
            max-height: 703px;
            background-color: ${config.chatbotWindow.bodyBackgroundColor};
            /* border: 2px solid transparent; */
            box-shadow: 1px 1px 10px;
            border-radius: 10px;
            position: relative;
            display: none;
            z-index: 99999;

        }

        #hyperleap-cross-icon {
            display: none;
        }

        #hyperleap-chatbot-auth {
            position: relative;
            width: 100%;
            height: 100%;
            overflow-y: auto;

        }

        .hyperleap-header {
            background-color: ${config.chatbotWindow.headerBackgroundColor};
            height: 35%;
            position: relative;
            width: 100%;
            overflow-y: auto;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            display: flex;
            justify-content: start;
            align-items: end;
        }

        .hyperleap-header-logo {
            position: absolute;
            left: 6%;
            top: 20px;
            cursor: pointer;
            height: 30px;
            object-fit: contain;
            display: flex;
            color: wheat;
            justify-content: center;
            align-items: center;
            width: 30px;
            z-index: 100;
        }

        .hyperleap-header-title {
            font-size: 25px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-weight: 700;
            line-height: 30px;
            margin: 0 6%;
            margin-bottom: 10%;
            color: ${config.chatbotWindow.headerTextColor};
            text-shadow: rgba(255, 255, 255, 0.3) 0px 0px 30px;
        }


        #hyperleap-chatbot-window-body-auth {
            position: relative;
            height: 55%;
            width: 100%;
            display: flex;
            justify-content: center;
            overflow-y: auto;
            align-items: center;
        }

        #hyperleap-otp-form {
            display: none;
        }

        .hyperleap-auth-form {
            width: 320px;
            height: max-content;
            display: flex;
            color:${config.chatbotWindow.bodyTextColor};
            justify-content: center;
            gap: 4px;
            align-items: start;
            flex-direction: column;
            font-size: 18px;
            /* height: 100%; */
        }

        .hyperleap-auth-input {
            border: 1px solid black;
            margin-top: 1px;
            font-size: 20px;
            border-radius: 5px;
            padding: 10px 7%;
            margin-bottom: 10px;
            width: 100%;
            max-width: 100%;
        }

        #hyperleap-auth-phone {
            border: 1px solid black;
            margin-top: 1px;
            font-size: 20px;
            border-radius: 5px;
            padding: 10px 7%;
            padding-left: 50px;
            margin-bottom: 10px;
            width: 320px;
            /* max-width: 100%; */
        }

        #hyperleap-auth-send-otp-button {
            border: 1px solid black;
            border-radius: 5px;
            padding: 12px 20px;
            font-size: 20px;
            background-color: ${config.chatbotWindow.headerBackgroundColor};
            width: 100%;
            margin-top: 10px;
            cursor: pointer;
            color: ${config.chatbotWindow.headerTextColor};

        }
        #hyperleap-auth-otp-verify-button {
            border: 1px solid black;
            border-radius: 5px;
            padding: 12px 20px;
            cursor: pointer;

            font-size: 20px;
            background-color: ${config.chatbotWindow.headerBackgroundColor};

            width: 100%;
            margin-top: 2px;
            color: ${config.chatbotWindow.headerTextColor};

        }

        #hyperleap-chatbot-chat {
            position: relative;
            width: 100%;
            height: 100%;
            overflow-y: auto;
        }

        #hyperleap-chatbot-window-header-chat {
            background-color: ${config.chatbotWindow.headerBackgroundColor};
            /* padding-top: 80px; */
            height: 25%;
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            align-items: end;
        }

        #hyperleap-chatbot-window-header-title {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-weight: 700;
            margin: 0 6%;
            margin-bottom: 7%;
            color: ${config.chatbotWindow.headerTextColor};
            text-shadow: rgba(255, 255, 255, 0.3) 0px 0px 30px;
            font-size: 26px;
            line-height: 28px;
            opacity: 0.8;

        }


        #hyperleap-chatbot-window-body-chat {

            position: relative;
            height: 75%;
            overflow-y: auto;
        }


        #hyperleap-chatbot-chats {
            height: 100%;
            overflow-y: auto;
            display: flex;
            gap: 10px;
            flex-direction: column;
        }

        .hyperleap-user-chat {
            max-width: 80%;
            display: flex;
            margin-right: 10px;
            gap: 5px;
            margin-left: auto;
            justify-content: end;
        }

        .hyperleap-assistant-chat {
            max-width: 80%;
            display: flex;
            margin-left: 10px;

            gap: 5px;
            align-items: end;
        }



        .hyperleap-chat:first-child {
            margin-top: 10px;
        }

        .hyperleap-chat:last-child {
            margin-bottom: 70px;
        }


        .hyperleap-assistant-chat-logo {
            border: 1px solid gray;
            height: 35px;
            border-radius: 4px;
            width: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(252, 252, 252, 0.958);
        }

        .hyperleap-assistant-chat-content {
            background-color: rgb(231, 231, 231);
            padding: 10px;
            border-radius: 8px;
            max-width: 80%;
        }

        .hyperleap-user-chat-content {
            background-color: rgb(231, 231, 231);
            padding: 10px;
            border-radius: 8px;
            max-width: 100%;
        }

        .hyperleap-chat-footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            display: flex;
            justify-content: center;
        }

        .hyperleap-chat-input {
            margin: auto;
            display: flex;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
            cursor: pointer;
            background-color: white;
            color: black;
            justify-content: space-between;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            align-items: center;
            width: 100%;
            margin: 0 auto;
            box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 2px 8px;

        }

        .hyperleap-chat-conversation-input {
            background-color: transparent;
            height: 56px;
            border: 0;
            width: 85%;
            line-height: 21px;
            font-size: 17px;
            padding: 0 10px;
            touch-action: none;
            outline: none;
        }

        #chat-conversation-input-button {
            height: 56px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: 0;
            width: 15%;
            z-index: 10;
        }

        #chat-conversation-input-button:hover {
            background-color: #0000002a;
        }

        #chat-back-button {
            position: absolute;
            left: 6%;
            top: 20px;
            cursor: pointer;
            height: 30px;
            object-fit: contain;
            display: flex;
            color: wheat;
            justify-content: center;
            align-items: center;
            width: 30px;
            z-index: 100;
        }

        #chat-back-button:hover {
            background-color: #d9d1d17a;
            border-radius: 50%;


        }

        .hyperleap-assistant-chat-content {
            background-color: rgb(242, 242, 242);
            padding: 17px 20px;
            border-radius: 10px;
            max-width: 80%;
        }

        .hyperleap-user-chat-content {
            background-color: ${config.chatbotWindow.headerBackgroundColor};
            color: ${config.chatbotWindow.headerTextColor};
            padding: 17px 20px;
            border-radius: 10px;
            max-width: 100%;
        }
    }`
    //     style.textContent = `@media screen and (max-width: 480px) {
    //     body {
    //         font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    //     }

    //     #hyperleap-chatbot-message {
    //         display: none;
    //     }

    //     .hyperleap-header-logo-image {
    //         width: 55px;
    //         height: 55px;
    //         object-fit: contain;
    //     }

    //     #hyperleap-chatbot-chat {
    //         display: none;
    //     }

    //     #hyperleap-chatbot-toggle-button {
    //         border: 2px solid transparent;
    //         box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.4);
    //         background-color: #009921e3;
    //         border-radius: 50%;
    //         color: white;
    //         padding: 10px;
    //         margin-left: auto;
    //         width: max-content;
    //         cursor: pointer;
    //         position: fixed;
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: flex-end;
    //         bottom: 14px;
    //         right: 14px;
    //         z-index: 9999;
    //     }

    //     #down-arrow {
    //         display: none;
    //     }

    //     #hyperleap-chatbot-window {
    //         width: 100vw;
    //         height: 100vh;
    //         background-color: white;
    //         position: fixed;
    //         overflow: hidden;
    //         top: 0;
    //         left: 0;
    //         z-index: 99999;
    //         display: none;
    //     }

    //     #hyperleap-cross-icon {
    //         position: fixed;
    //         right: 20px;
    //         top: 20px;
    //         cursor: pointer;
    //         height: 30px;
    //         display: flex;
    //         color: white;
    //         justify-content: center;
    //         align-items: center;
    //         width: 30px;
    //         z-index: 100;
    //         border-radius: 50%;
    //     }

    //     #hyperleap-cross-icon:active {
    //         background-color: rgba(150, 149, 149, 0.493);
    //     }

    //     #hyperleap-chatbot-auth {
    //         position: relative;
    //         width: 100vw;
    //         height: 100vh;
    //     }



    //     .hyperleap-header {
    //         background-color: #009921e3;
    //         height: 35%;
    //         position: relative;
    //         width: 100%;

    //         display: flex;
    //         justify-content: start;
    //         align-items: end;
    //     }

    //     .hyperleap-header-logo {
    //         position: fixed;
    //         left: 6%;
    //         top: 20px;
    //         cursor: pointer;
    //         height: 55px;
    //         object-fit: contain;
    //         display: flex;
    //         color: wheat;
    //         justify-content: center;
    //         align-items: center;
    //         width: 55px;
    //         z-index: 100;
    //     }

    //     .hyperleap-header-title {
    //         font-size: 25px;
    //         font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    //         font-weight: 700;
    //         line-height: 30px;
    //         margin: 0 6%;
    //         margin-bottom: 10%;
    //         color: white;
    //         text-shadow: rgba(255, 255, 255, 0.3) 0px 0px 30px;
    //     }

    //     #hyperleap-chatbot-window-body-auth {
    //         position: relative;
    //         height: 65%;
    //         width: 100%;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //     }

    //     #hyperleap-otp-form {
    //         display: none;
    //     }

    //     .hyperleap-auth-form {
    //         width: 80%;
    //         height: max-content;
    //         display: flex;
    //         justify-content: center;
    //         gap: 4px;
    //         align-items: start;
    //         flex-direction: column;
    //         font-size: 18px;
    //         /* height: 100%; */
    //     }

    //     .hyperleap-auth-input {
    //         border: 1px solid black;
    //         margin-top: 1px;
    //         font-size: 20px;
    //         border-radius: 5px;
    //         padding: 10px 7%;
    //         margin-bottom: 10px;
    //         width: 100%;
    //         max-width: 100%;
    //     }

    //     #hyperleap-auth-phone {
    //         border: 1px solid black;
    //         margin-top: 1px;
    //         font-size: 20px;
    //         border-radius: 5px;
    //         padding: 10px 7%;

    //         padding-left: 50px;
    //         margin-bottom: 10px;
    //         width: 80vw;
    //         /* max-width: 100%; */
    //     }

    //     #hyperleap-auth-send-otp-button {
    //         border: 0px solid black;
    //         border-radius: 5px;
    //         padding: 12px 20px;
    //         font-size: 20px;
    //         background-color: #009921e3;
    //         width: 100%;
    //         margin-top: 10px;
    //         cursor: pointer;
    //         color: white;
    //     }

    //     #hyperleap-auth-otp-verify-button {
    //         border: 0px solid black;
    //         border-radius: 5px;
    //         padding: 12px 20px;
    //         font-size: 20px;
    //         background-color: #009921e3;
    //         width: 100%;
    //         cursor: pointer;
    //         margin-top: 2px;
    //         color: white;
    //     }


    //     #hyperleap-chatbot-chat {
    //         position: relative;
    //         width: 100vw;
    //         height: 100%;
    //         max-height: dvh;
    //     }

    //     #hyperleap-chatbot-window-header-chat {
    //         background-color: #009920;
    //         /* padding-top: 80px; */
    //         height: 24%;
    //         position: relative;
    //         width: 100%;
    //         display: flex;
    //         justify-content: center;
    //         align-items: end;
    //     }

    //     #hyperleap-chatbot-window-header-title {
    //         font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    //         font-weight: 700;
    //         margin: 0 6%;
    //         margin-bottom: 7%;
    //         color: white;
    //         text-shadow: rgba(255, 255, 255, 0.3) 0px 0px 30px;
    //         font-size: 26px;
    //         line-height: 28px;
    //         opacity: 0.8;

    //     }

    //     #hyperleap-chatbot-window-body-chat {
    //         position: relative;
    //         height: 80%;
    //         overflow-y: auto;
    //     }


    //     #hyperleap-chatbot-chats {
    //         height: 100%;
    //         overflow-y: auto;
    //         display: flex;
    //         gap: 16px;
    //         flex-direction: column;
    //     }

    //     .hyperleap-user-chat {
    //         max-width: 80%;
    //         display: flex;
    //         margin-right: 10px;
    //         gap: 5px;
    //         margin-left: auto;
    //         justify-content: end;
    //     }

    //     .hyperleap-assistant-chat {
    //         max-width: 80%;
    //         display: flex;
    //         margin-left: 10px;

    //         gap: 5px;
    //         align-items: end;
    //     }

    //     .hyperleap-chat {
    //         font-size: 14px;
    //         line-height: 1.4;
    //         font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    //     }


    //     .hyperleap-chat:first-child {
    //         margin-top: 10px;
    //     }

    //     .hyperleap-chat:last-child {
    //         margin-bottom: 120px;
    //     }

    //     .hyperleap-assistant-chat-logo {
    //         border: 1px solid gray;
    //         height: 35px;
    //         padding: 0 3px;
    //         border-radius: 50%;
    //         width: 35px;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //     }


    //     .hyperleap-user-chat-logo {
    //         border: 0px solid gray;
    //         height: 100%;
    //         width: 35px;
    //         display: flex;
    //         margin-top: auto;
    //         justify-content: center;
    //         align-items: end;
    //     }

    //     .hyperleap-assistant-chat-content {
    //         background-color: #009921d6;
    //         padding: 17px 20px;
    //         font-size: 12px;
    //         color: white;

    //         overflow-wrap: break-word;
    //         border-radius: 10px;
    //         max-width: 80%;
    //     }

    //     .hyperleap-user-chat-content {
    //         background-color: #009921d6;
    //         color: white;
    //         padding: 17px 20px;
    //         font-size: 12px;
    //         border-radius: 10px;
    //         overflow-wrap: break-word;
    //         max-width: 100%;
    //     }

    //     .hyperleap-chat-footer {
    //         position: fixed;
    //         bottom: 0;
    //         width: 100%;
    //         display: flex;
    //         justify-content: center;
    //     }

    //     .hyperleap-chat-input {
    //         margin: auto;
    //         display: flex;
    //         border-top: 1px solid rgba(0, 0, 0, 0.08);
    //         cursor: pointer;
    //         background-color: white;
    //         color: black;
    //         justify-content: space-between;
    //         align-items: center;
    //         width: 100%;
    //         margin: 0 auto;
    //         box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 2px 8px;

    //     }

    //     .hyperleap-chat-conversation-input {
    //         background-color: transparent;
    //         height: 56px;
    //         border: 0;
    //         width: 85%;
    //         line-height: 21px;
    //         font-size: 17px;
    //         padding: 0 10px;
    //         touch-action: none;
    //         outline: none;
    //     }

    //     #chat-conversation-input-button {
    //         height: 56px;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //         cursor: pointer;
    //         border: 0;
    //         width: 15%;
    //         z-index: 10;
    //     }

    //     #chat-conversation-input-button:active {
    //         background-color: #0000002a;
    //     }

    //     #chat-back-button:hover {
    //         background-color: #d9d1d17a;
    //         border-radius: 50%;
    //     }

    //     #hyperleap-chatbot-window-footer {
    //         display: grid;
    //         grid-template-columns: 1fr 1fr;
    //         position: absolute;
    //         bottom: 0;
    //         font-size: 14px;
    //         /* border-radius: 0 0 8px 8px; */
    //         height: 14%;
    //         width: 100%;
    //         box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 25px;

    //     }

    //     .chatbot-footer-button {
    //         height: 100%;
    //         width: 100%;
    //         display: flex;
    //         border: 0;
    //         border-top: 1px solid rgba(0, 0, 0, 0.05);
    //         background-color: white;
    //         justify-content: center;
    //         align-items: center;
    //         flex-direction: column;
    //         cursor: pointer;
    //     }


    //     .chatbot-footer-button:hover {
    //         background-color: #0000002a;
    //     }
    // }

    // @media screen and (min-width: 480px) {
    //     body {
    //         font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    //     }

    //     #hyperleap-chatbot-message {
    //         display: none;
    //     }

    //     #hyperleap-chatbot {
    //         position: fixed;
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: flex-end;
    //         bottom: 18px;
    //         right: 18px;
    //     }

    //     #hyperleap-chatbot-chat {
    //         display: none;
    //     }

    //     #hyperleap-chatbot-toggle-button {
    //         border: 2px solid transparent;
    //         box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.4);
    //         background-color: #009921e3;
    //         border-radius: 50%;
    //         color: white;
    //         padding: 10px;
    //         margin: 10px;
    //         margin-left: auto;
    //         width: max-content;
    //         cursor: pointer;
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: flex-end;
    //         z-index: 99999;
    //     }

    //     input::-webkit-outer-spin-button,
    //     input::-webkit-inner-spin-button {
    //         -webkit-appearance: none;
    //         margin: 0;
    //     }

    //     /* Firefox */
    //     input[type=number] {
    //         -moz-appearance: textfield;
    //     }

    //     #down-arrow {
    //         display: none;
    //     }

    //     #hyperleap-chatbot-window {
    //         width: 400px;
    //         height: 80vh;
    //         max-height: 703px;
    //         background-color: white;
    //         /* border: 2px solid transparent; */
    //         box-shadow: 1px 1px 10px;
    //         border-radius: 10px;
    //         position: relative;
    //         display: none;
    //         z-index: 99999;

    //     }

    //     #hyperleap-cross-icon {
    //         display: none;
    //     }

    //     #hyperleap-chatbot-auth {
    //         position: relative;
    //         width: 100%;
    //         height: 100%;
    //         overflow-y: auto;

    //     }

    //     .hyperleap-header {
    //         background-color: #009921e3;
    //         height: 35%;
    //         position: relative;
    //         width: 100%;
    //         overflow-y: auto;
    //         border-top-right-radius: 10px;
    //         border-top-left-radius: 10px;
    //         display: flex;
    //         justify-content: start;
    //         align-items: end;
    //     }

    //     .hyperleap-header-logo {
    //         position: absolute;
    //         left: 6%;
    //         top: 20px;
    //         cursor: pointer;
    //         height: 55px;
    //         object-fit: contain;
    //         display: flex;
    //         color: wheat;
    //         justify-content: center;
    //         align-items: center;
    //         width: 55px;
    //         z-index: 100;
    //     }

    //     .hyperleap-header-logo-image {
    //         width: 70px;
    //         height: 70px;
    //         object-fit: contain;
    //     }

    //     .hyperleap-header-title {
    //         font-size: 25px;
    //         font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    //         font-weight: 700;
    //         line-height: 30px;
    //         margin: 0 6%;
    //         margin-bottom: 10%;
    //         color: white;
    //         text-shadow: rgba(255, 255, 255, 0.3) 0px 0px 30px;
    //     }


    //     #hyperleap-chatbot-window-body-auth {
    //         position: relative;
    //         height: 65%;
    //         width: 100%;
    //         display: flex;
    //         justify-content: center;
    //         overflow-y: auto;
    //         align-items: center;
    //     }

    //     #hyperleap-otp-form {
    //         display: none;
    //     }

    //     .hyperleap-auth-form {
    //         width: 320px;
    //         height: max-content;
    //         display: flex;
    //         justify-content: center;
    //         gap: 4px;
    //         align-items: start;
    //         flex-direction: column;
    //         font-size: 18px;
    //         /* height: 100%; */
    //     }

    //     .hyperleap-auth-input {
    //         border: 1px solid black;
    //         margin-top: 1px;
    //         font-size: 20px;
    //         border-radius: 5px;
    //         padding: 10px 7%;
    //         margin-bottom: 10px;
    //         width: 100%;
    //         max-width: 100%;
    //     }

    //     #hyperleap-auth-phone {
    //         border: 1px solid black;
    //         margin-top: 1px;
    //         font-size: 20px;
    //         border-radius: 5px;
    //         padding: 10px 7%;
    //         padding-left: 50px;
    //         margin-bottom: 10px;
    //         width: 320px;
    //         /* max-width: 100%; */
    //     }

    //     #hyperleap-auth-send-otp-button {
    //         border: 0px solid black;
    //         border-radius: 5px;
    //         padding: 12px 20px;
    //         font-size: 20px;
    //         background-color: #009921e3;
    //         width: 100%;
    //         margin-top: 10px;
    //         color: white;
    //         cursor: pointer;
    //     }

    //     #hyperleap-auth-otp-verify-button {
    //         border: 0px solid black;
    //         border-radius: 5px;
    //         padding: 12px 20px;
    //         font-size: 20px;
    //         background-color: #009921e3;
    //         width: 100%;
    //         margin-top: 2px;
    //         color: white;
    //         cursor: pointer;
    //     }

    //     #hyperleap-chatbot-chat {
    //         position: relative;
    //         width: 100%;
    //         height: 100%;
    //         overflow-y: auto;
    //     }

    //     #hyperleap-chatbot-window-header-chat {
    //         background-color: #009921e3;
    //         /* padding-top: 80px; */
    //         height: 25%;
    //         position: relative;
    //         width: 100%;
    //         display: flex;
    //         justify-content: center;
    //         border-top-right-radius: 10px;
    //         border-top-left-radius: 10px;
    //         align-items: end;
    //     }

    //     #hyperleap-chatbot-window-header-title {
    //         font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    //         font-weight: 700;
    //         margin: 0 6%;
    //         margin-bottom: 7%;
    //         color: white;
    //         /* text-shadow: rgba(255, 255, 255, 0.3) 0px 0px 30px; */
    //         font-size: 26px;
    //         line-height: 28px;
    //         opacity: 0.9;

    //     }


    //     #hyperleap-chatbot-window-body-chat {

    //         position: relative;
    //         height: 75%;
    //         overflow-y: auto;
    //     }


    //     #hyperleap-chatbot-chats {
    //         height: 100%;
    //         overflow-y: auto;
    //         display: flex;
    //         gap: 10px;
    //         flex-direction: column;
    //     }

    //     .hyperleap-user-chat {
    //         max-width: 80%;
    //         display: flex;
    //         margin-right: 10px;
    //         gap: 5px;
    //         margin-left: auto;
    //         justify-content: end;
    //     }

    //     .hyperleap-assistant-chat {
    //         max-width: 80%;
    //         display: flex;
    //         margin-left: 10px;

    //         gap: 5px;
    //         align-items: end;
    //     }



    //     .hyperleap-chat:first-child {
    //         margin-top: 10px;
    //     }

    //     .hyperleap-chat:last-child {
    //         margin-bottom: 70px;
    //     }


    //     .hyperleap-assistant-chat-logo {
    //         border: 1px solid gray;
    //         height: 35px;
    //         border-radius: 50%;
    //         width: 35px;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //         background-color: rgba(252, 252, 252, 0.958);
    //     }

    //     .hyperleap-assistant-chat-content {
    //         background-color: #009920;
    //         padding: 10px;
    //         border-radius: 8px;
    //         font-size: 12px;
    //         overflow-wrap: break-word;
    //         max-width: 80%;
    //     }

    //     .hyperleap-user-chat-content {
    //         background-color: rgb(231, 231, 231);
    //         padding: 10px;
    //         overflow-wrap: break-word;
    //         font-size: 12px;
    //         border-radius: 8px;
    //         max-width: 80%;
    //     }

    //     .hyperleap-chat-footer {
    //         position: absolute;
    //         bottom: 0;
    //         width: 100%;
    //         border-bottom-left-radius: 10px;
    //         border-bottom-right-radius: 10px;
    //         display: flex;
    //         justify-content: center;
    //     }

    //     .hyperleap-chat-input {
    //         margin: auto;
    //         display: flex;
    //         border-top: 1px solid rgba(0, 0, 0, 0.08);
    //         cursor: pointer;
    //         background-color: white;
    //         color: black;
    //         justify-content: space-between;
    //         border-bottom-left-radius: 10px;
    //         border-bottom-right-radius: 10px;
    //         align-items: center;
    //         width: 100%;
    //         margin: 0 auto;
    //         box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 2px 8px;

    //     }

    //     .hyperleap-chat-conversation-input {
    //         background-color: transparent;
    //         height: 56px;
    //         border: 0;
    //         width: 85%;
    //         line-height: 21px;
    //         font-size: 17px;
    //         padding: 0 10px;
    //         touch-action: none;
    //         outline: none;
    //     }

    //     #chat-conversation-input-button {
    //         height: 56px;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //         cursor: pointer;
    //         border: 0;
    //         width: 15%;
    //         z-index: 10;
    //     }

    //     #chat-conversation-input-button:hover {
    //         background-color: #0000002a;
    //     }

    //     #chat-back-button {
    //         position: absolute;
    //         left: 6%;
    //         top: 20px;
    //         cursor: pointer;
    //         height: 30px;
    //         object-fit: contain;
    //         display: flex;
    //         color: wheat;
    //         justify-content: center;
    //         align-items: center;
    //         width: 30px;
    //         z-index: 100;
    //     }

    //     #chat-back-button:hover {
    //         background-color: #d9d1d17a;
    //         border-radius: 50%;


    //     }

    //     .hyperleap-user-chat-logo {
    //         border: 0px solid gray;
    //         height: 100%;
    //         width: 35px;
    //         display: flex;
    //         margin-top: auto;
    //         justify-content: center;
    //         align-items: end;
    //         /* align-items: center; */
    //     }

    //     .hyperleap-assistant-chat-content {
    //         background-color: #009921d6;
    //         padding: 17px 20px;
    //         font-size: 12px;
    //         color: white;

    //         overflow-wrap: break-word;
    //         border-radius: 10px;
    //         max-width: 80%;
    //     }

    //     .hyperleap-user-chat-content {
    //         background-color: #009921d6;
    //         color: white;
    //         padding: 17px 20px;
    //         font-size: 12px;
    //         border-radius: 10px;
    //         overflow-wrap: break-word;
    //         max-width: 100%;
    //     }
    // }`
    document.head.appendChild(style);


    const chatHTML = ` <div id="hyperleap-chatbot">
        <div id="hyperleap-chatbot-window">
            <div id="hyperleap-cross-icon"><svg xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" height="15px" width="15px"
                    version="1.1" id="Capa_1" viewBox="0 0 490 490" xml:space="preserve">
                    <polygon
                        points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 " />
                </svg>
            </div>
            
            <div id="hyperleap-chatbot-chat">
                <div id="hyperleap-chatbot-window-header-chat">
                    <div class="hyperleap-header-logo">
    <img src=${config.chatbotWindow.logo} alt="Hyperleap"
                            class="hyperleap-header-logo-image">
                    </div>
                    <!-- 
                    <div id="chat-back-button" class="hyperleap-header-logo">

                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 1024 1024"
                            class="icon" version="1.1">
                            <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                                fill="#fff" />
                        </svg>
                    </div> -->

                    <div id="hyperleap-chatbot-window-header-title">

                        We are here to serve you 24/7
                    </div>
                </div>
                <div id="hyperleap-chatbot-window-body-chat">


                    <div id="hyperleap-chatbot-chats">

                        <!-- <div class="hyperleap-user-chat hyperleap-chat">

                            <div class="hyperleap-user-chat-content">
                                I want to see your messages message I want to see your messages message
                                I want to see your messages message I want to see your messages message

                            </div>
                        </div>

                        <div class="hyperleap-user-chat hyperleap-chat">

                            <div class="hyperleap-user-chat-content ">
                                I want to see your messages message I want to see your messages message
                                I want to see your messages message I want to see your messages message

                            </div>
                        </div>

                        <div class="hyperleap-assistant-chat hyperleap-chat">

                            <div class="hyperleap-assistant-chat-logo">
                                logo
                            </div>
                            <div class="hyperleap-assistant-chat-content">
                                I want to see your messages message I want to see your messages message
                                I want to see your messages message I want to see your messages message

                            </div>
                        </div> -->
                    </div>

                    <div class="hyperleap-chat-footer">
                        <div id="chat-input" class="hyperleap-chat-input">
                            <input type="text" id="chat-conversation-input" class="hyperleap-chat-conversation-input"
                                placeholder="type here...">
                            <div id="chat-conversation-input-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none"
                                    viewBox="0 0 17 16" color="linkColor" style="margin: 0 auto;">
                                    <path fill="currentColor" fill-rule="evenodd"
                                        d="m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <button id="hyperleap-chatbot-toggle-button">
            <svg xmlns="http://www.w3.org/2000/svg" id="chat-icon" xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="currentColor" height="34px" width="34px" version="1.1" id="Layer_1" viewBox="0 0 459.579 459.579"
                xml:space="preserve">
                <g>
                    <g>
                        <g>
                            <path
                                d="M429.579,14.7H139.935c-16.569,0-30,13.431-30,30v80.993h30V44.7h289.644v183.393h-48.495v30h48.495     c16.568,0,30-13.431,30-30V44.7C459.579,28.132,446.148,14.7,429.579,14.7z" />
                            <path
                                d="M319.644,155.693H30c-16.565,0-30,13.427-30,30v183.393c0,16.569,13.431,30,30,30h92.333l29.531,35.11     c11.99,14.255,33.945,14.234,45.917,0l29.531-35.11h92.333c9.32,0,17.647-4.25,23.149-10.917c0.306-0.37,0.603-0.748,0.891-1.133     c3.743-5.005,5.96-11.219,5.96-17.95V185.693C349.644,169.126,336.214,155.693,319.644,155.693z M319.644,369.086h-106.3     l-38.522,45.799L136.3,369.086H30V185.693h289.644V369.086z" />
                            <path
                                d="M80.011,257.792h189.621c8.284,0,15-6.716,15-15s-6.716-15-15-15H80.011c-8.284,0-15,6.716-15,15     S71.727,257.792,80.011,257.792z" />
                            <path
                                d="M80.011,325.573h77.621c8.284,0,15-6.716,15-15s-6.716-15-15-15H80.011c-8.284,0-15,6.716-15,15     S71.727,325.573,80.011,325.573z" />
                        </g>
                    </g>
                </g>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="down-arrow" height="34px" width="34px" viewBox="0 0 24 24"
                fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                    fill="currentColor" />
            </svg>
        </button>
    </div>`;

    // Inject chat widget into the page
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // var script = document.createElement('script');
    // script.src = '../new.js';
    // document.body.appendChild(script);



    const toggleButton = document.getElementById('hyperleap-chatbot-toggle-button');
    const chatIcon = document.getElementById('chat-icon');
    const downArrow = document.getElementById('down-arrow');
    const chatbotWindow = document.getElementById('hyperleap-chatbot-window');
    const crossIcon = document.getElementById('hyperleap-cross-icon');
    const chatSection = document.getElementById('hyperleap-chatbot-chat');
    const chatsSection = document.getElementById('hyperleap-chatbot-chats');
    const authSection = document.getElementById('hyperleap-chatbot-auth');
    const footerSection = document.getElementById('hyperleap-chatbot-window-footer');
    const sendOTPButton = document.getElementById('hyperleap-auth-send-otp-button')
    const verifyOTPButton = document.getElementById('hyperleap-auth-otp-verify-button')
    const otpSection = document.getElementById('hyperleap-otp-form')
    const inputInfoSection = document.getElementById('hyperleap-info-form')
    const conversationSection = document.getElementById('recent-hyperleap-chat-messages')
    const chatConversationInputTag = document.getElementById('chat-conversation-input')
    const chatConversationInputButton = document.getElementById('chat-conversation-input-button')

    let authorized = false
    let conversationId = ""

    // const defaultConfig = {
    //     chaticon: {
    //         position: 'right',
    //         icon_color: 'black',
    //         icon_background_color: 'white'
    //     },
    //     chatbotWindow: {
    //         headerBackgroundColor: 'black',
    //         headerTextColor: 'white',
    //         bodyBackgroundColor: 'white',
    //         bodyTextColor: 'black',
    //     },
    //     personaIds: null,
    //     privateKey: null
    // };

    // // Merge default config with user config
    // const config = { ...defaultConfig, ...window.userChatbotConfig };
    const privateKey = config.privateKey
    const personaId = config.personaId
 

    const init = async() => {
            await fetch('https://api.hyperleap.ai/conversations/persona', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hl-api-key': privateKey
                },
                body: JSON.stringify({
                    "personaId": personaId,
                    "replacements": {
                        "person": "person value"
                    }
                })
            }).then(response => response.json())
                .then(data => {
                    conversationId = data.conversationId
                    // window.sessionStorage.setItem('hyperleap', JSON.stringify({
                    //     conversationId: conversationId
                    // }))

                })
                .catch(error => console.error('Error:', error));



            authorized = true
            // chatIcon.style.display = 'none';
            // downArrow.style.display = 'block';
            // chatSection.style.display = 'block';
            // authSection.style.display = 'none'
    
    }


    toggleButton.addEventListener('click', async() => {
        

        if (chatIcon.style.display === 'none') {
            chatIcon.style.display = 'block';
            downArrow.style.display = 'none';
            chatbotWindow.style.display = 'none';
            window.sessionStorage.setItem('toggle', false)

        } else {
            window.sessionStorage.setItem('toggle', true)

            chatbotWindow.style.display = 'block';
                chatIcon.style.display = 'none';
                downArrow.style.display = 'block';
                chatSection.style.display = 'block';
            
        }
        await init();
    });

    crossIcon.addEventListener('click', () => {
        chatIcon.style.display = 'block';
        downArrow.style.display = 'none';
        chatbotWindow.style.display = 'none';
    });

    const sendChatMessage = async ({ id, message }) => {
        const options = {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                'x-hl-api-key': privateKey,
                'content-type': 'application/*+json'
            },
            body: JSON.stringify({ message: message.toString() })
        };

        const response = await fetch(`https://api.hyperleap.ai/conversations/${id}/continue`, options)
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        const newMessage = document.createElement('div');
        newMessage.className = 'hyperleap-assistant-chat hyperleap-chat';
        newMessage.innerHTML = `  <div class="hyperleap-assistant-chat-logo">
            <img src=${config.chatbotWindow.logo} alt="Hyperleap" style="width:35px; height:35px"
                                class="hyperleap-header-logo-image">
                </div>
                `;


        const mes = document.createElement('div');
        mes.className = "hyperleap-assistant-chat-content"
        newMessage.appendChild(mes)
        chatsSection.appendChild(newMessage);
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            let text = decoder.decode(value);
            try{

            if (text[0] == "[") {
                for (const item of JSON.parse("[" + text.slice(1) + "]")) {
                    mes.innerText += item.choice.message.content ? item.choice.message.content : ""
                    mes.scrollIntoView({ behavior: 'smooth' });

                }
            } else if (text[0] == ",") {
                for (const item of JSON.parse("[" + text.slice(1) + "]")) {
                    mes.innerText += item.choice?.message?.content ? item.choice.message.content : ""
                    mes.scrollIntoView({ behavior: 'smooth' });

                }

            } else if (text[text.length - 1] == "]") {
                for (const item of JSON.parse("[" + text.slice(0, text.length - 2) + "]")) {
                    mes.innerText += item.choice.message.content ? item.choice.message.content : ""
                    mes.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }catch(e){
            console.log(e);
        }

        }
    }


    chatConversationInputButton.addEventListener('click', async () => {
        const chatConversationInput = document.getElementById('chat-conversation-input');
        const message = chatConversationInput.value;
        chatConversationInput.value = '';

        if (message) {

            const newMessage = document.createElement('div');
            newMessage.className = 'hyperleap-user-chat hyperleap-chat';


            const mes = document.createElement('div');
            mes.className = "hyperleap-assistant-chat-content"
            mes.innerText += message
            newMessage.appendChild(mes)
            const icon = document.createElement('div');
            icon.className = "hyperleap-user-chat-logo"
            icon.innerHTML = `                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z" /></svg>
    `
            newMessage.appendChild(icon);
            chatsSection.appendChild(newMessage);
            newMessage.scrollIntoView({ behavior: 'smooth' });
        }

        const item = await sendChatMessage({
            id: conversationId,
            message: message
        });

        console.log(item);
    });

    chatConversationInputTag.addEventListener('keydown', async () => {
        if (event.key === 'Enter') {

            const chatConversationInput = document.getElementById('chat-conversation-input');
            const message = chatConversationInput.value;
            chatConversationInput.value = '';

            if (message) {
                // const newMessage = document.createElement('div');
                // newMessage.className = 'hyperleap-user-chat hyperleap-chat';
                // newMessage.innerHTML = `<div class="hyperleap-user-chat-content">${message}</div>`;
                // chatsSection.appendChild(newMessage);
                const newMessage = document.createElement('div');
                newMessage.className = 'hyperleap-user-chat hyperleap-chat';
                // newMessage.innerHTML = `  
                //         `;


                const mes = document.createElement('div');
                mes.className = "hyperleap-assistant-chat-content"
                mes.innerText += message
                newMessage.appendChild(mes)
                const icon = document.createElement('div');
                icon.className = "hyperleap-user-chat-logo"
                icon.innerHTML = `                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z" /></svg>
    `
                newMessage.appendChild(icon);
                chatsSection.appendChild(newMessage);
                newMessage.scrollIntoView({ behavior: 'smooth' });

            }

            const item = await sendChatMessage({
                id: conversationId,
                message: message
            });

            console.log(item);
        }
    });




})();