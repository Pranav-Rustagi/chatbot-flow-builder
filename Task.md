# BiteSpeed Frontend Task: Chatbot flow builder

# Overview:

We’ll build a simple Chatbot flow builder using React and try to make the code extensible to easily add new features. 

A chatbot flow is built by connecting multiple messages together to decide the order of execution. 

*(double click on the images to enlarge)*

![Text node.jpeg](https://bitespeed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F75974f28-7e11-4222-b99f-83ae626dc6b8%2FText_node.jpeg?table=block&id=118525ef-afef-4cf8-b073-d813ce8493b2&spaceId=bd075709-aeb9-477a-aa0d-347a38181da2&width=2000&userId=&cache=v2)

# **Note →** 

- Use https://reactflow.dev/ for the flow builder.
- You are free to use any other library on top of React Flow.
- You can use either of JavaScript or TypeScript for this Task
- Add comments to explain your code

# Features:

1. **Text Node** 
    1. Our flow builder currently supports only one type of message (i.e Text Message).
    2. There can be multiple Text Nodes in one flow.
    3. Nodes are added to the flow by dragging and dropping a Node from the Nodes Panel.
2. **Nodes Panel** 
    1. This panel houses all kind of Nodes that our Flow Builder supports.
    2. Right now there is only Message Node, but we’d be adding more types of Nodes in the future so make this section extensible 
3. **Edge**
    1. Connects two Nodes together
4. **Source Handle**
    1. Source of a connecting edge 
    2. Can only have **one edge** originating from a source handle
5. **Target Handle** 
    1. Target of a connecting edge
    2. Can have **more than one edge** connecting to a target handle 
6. **Settings Panel**
    
    ![Settings panel.jpeg](https://bitespeed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F38e424e4-01cd-462b-a4af-29de9d2c404c%2FSettings_panel.jpeg?table=block&id=7ae6c90f-b3d5-47e9-9d12-0d0b7275bf5f&spaceId=bd075709-aeb9-477a-aa0d-347a38181da2&width=2000&userId=&cache=v2)
    
    1. Settings Panel will replace the Nodes Panel when a Node is selected
    2. It has a text field to edit text of the selected Text Node
7. **Save Button**
    1. Button to save the flow 
    2. **Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles** 
        
        ![Screenshot 2022-10-24 at 10.41.29 PM.png](https://bitespeed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb33c6166-aa3e-4c1a-b1b8-1dbd010e1e2e%2FScreenshot_2022-10-24_at_10.41.29_PM.png?table=block&id=fcd6da61-a9da-42e5-a341-77871648de6e&spaceId=bd075709-aeb9-477a-aa0d-347a38181da2&width=2000&userId=&cache=v2)
        
    
    # Submission
    
    1. **Deploy** a working version on a **free hosting service** like Heroku, Vercel, etc 
    2. Host the **code repo on Github** and add hosting link from the above step to the **readme file** 
    3. **Please fill this form to submit the task**