# StudyFlow: Personalized AI-Driven Study Plans

## Inspiration

The idea for **StudyFlow** emerged from the challenges many students and professionals face when trying to manage their time efficiently. We noticed that while there are many generic study tools, few provide the personalized guidance people need to stay focused and productive. Our goal was to create an app that leverages AI to generate tailored study plans and focus-enhancing exercises, empowering users to achieve their academic and professional goals.

## What it does

**StudyFlow** generates personalized study plans based on the user’s subject matter, goals, and deadlines. Users simply input their needs, and the app uses AI to create a customized schedule designed to keep them on track. Additionally, StudyFlow provides AI-generated exercises that help users stay focused, ensuring they take breaks and engage in activities that support their learning journey.

## How we built it

We built **StudyFlow** using a combination of **Express** and **Sequelize** on the backend, managing user data and study plans in a structured, scalable way. The frontend was built with **React** and **Redux**, allowing for seamless state management and a responsive user interface. We integrated **OpenAI API** to dynamically generate study plans and exercises tailored to each user’s unique needs and preferences, making the experience highly personalized.

## Challenges we ran into

One of the major challenges we faced was optimizing the AI-generated study plans to ensure they were both effective and personalized. Obviously, this is an enhancement we will work in the future, considering new prompts depending on the subject the user inputs. It took multiple iterations of AI prompt design to generate plans that felt tailored to users’ needs. Another challenge was balancing state management in React-Redux, especially when handling real-time updates for study plans and exercises. We also had to find the right balance between automation and user control, ensuring that users felt empowered by the AI suggestions.

## Accomplishments that we're proud of

We’re proud of successfully integrating AI to provide real-time, personalized study plans that adapt to different user inputs. The seamless user experience we created, from study plan generation to exercise recommendations, exceeded our initial expectations. Additionally, implementing a robust backend with **Express** and **Sequelize** made the app scalable and efficient, which we’re proud to have accomplished within a short timeframe.

## What we learned

Throughout the development process, we learned a lot about **AI prompt engineering** and the nuances of creating truly personalized user experiences. We also gained a deeper understanding of managing application state in **React-Redux**, especially when dealing with dynamic content. Finally, we learned how to optimize full-stack development using **Express**, **Sequelize**, and AI technologies to create a smooth, functional product.

## What's next for StudyFlow

Moving forward, we plan to enhance **StudyFlow** by incorporating more advanced AI features, such as analyzing user progress over time and adapting study plans accordingly. We’re also exploring ways to integrate additional learning resources and content recommendations to further support users in achieving their goals. Another short-term future enhancement is incorporate AWS S3 for image and files management (this is a feature we didn't decide to include it for this hackathon due to the time restrictions), because we want to generate Study Plans amd exercises in PDF format, so users can download them and print them, for a better on-the-go experience. Also, we would like to add more features, like have Subjects as a Table in the Database Model, this enhancement will allow us to improve how AI understands the purpose of every request, and we can allow users to create their own Subjects Collections for a better management of their studyplans. Finally, we aim to improve the UI/UX design to make StudyFlow even more intuitive and engaging for users.
