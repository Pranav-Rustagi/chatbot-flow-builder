# Chatbot flow builder

Built using **react**, **react-flow** and **vite**

A chatbot flow is built by connecting multiple messages together to decide the order of execution.

## Features:
1. Text Node
    - Our flow builder currently supports only one type of message (i.e Text Message).
    - There can be multiple Text Nodes in one flow.
    - Nodes are added to the flow by dragging and dropping a Node from the Nodes Panel.

2. Nodes Panel
    - This panel houses all kind of Nodes that our Flow Builder supports.
    - Right now there is only Message Node, but we’d be adding more types of Nodes in the future so make this section extensible

3. Edge
    - Connects two Nodes together

4. Source Handle
    - Source of a connecting edge
    - Can only have one edge originating from a source handle

5. Target Handle
    - Target of a connecting edge
    - Can have more than one edge connecting to a target handle

6. Settings Panel
    - Settings Panel will replace the Nodes Panel when a Node is selected
    - It has a text field to edit text of the selected Text Node

7. Save Button
    - Button to save the flow
    - Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles