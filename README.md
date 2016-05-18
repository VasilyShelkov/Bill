# Bill

##Deployed at http://Bill-stambridge.rhcloud.com 

##How to get this going locally!
###Setup
```
git clone https://github.com/VasilyShelkov/Bill.git
cd ~/Bill
npm install
```
###Running
After setup you can run the app at localhost:3000(by default) by:
```
npm run dev
```
or 
```
npm start
```
###Testing
Once setup then:
```
npm test
```

##Some Explanation
ReactJS was used as the View part of the application. When the component initially mounts, the BillApp's ComponentDidMount lifecycle method triggers a dispatch(fetchStatement()) which is completely decoupled and could easily be moved to a button click or anything else.

Redux was used to manage the data flow(despite the overhead and added complexity for this simple task) for 2 reasons:
1. Wanted to show that I could use ReduxJS and understood how the Flux architecture works. Also I have deliberately build it to be able to consume more than 1 statement
2. It also allowed me to show how I'd tested the data flow because it's completely independent from the views

I focussed on making the implementation as generic as possible. I could have easily implemented specific components for the each specific charge category(such as packages) at the endpoint, however, I felt this is what anyone could do. To try to show a better understanding, I've reasonably attempted to have 2 main components: 
- Overview - This is the pie chart and top of the rendered solution.
- ChargeList - Rather than uniquely creating components for each of the charge categories (eg skyStore, packages etc..), I've tried to create a generic component that given the structure of { cost, numberOfArrays showing subCategories }. While I was successful with this data, I realised the current limitation of this approach is that there needs to be a way of uniquely identifying each individual charge. Calls for example has the details called and duration. Fortunately in the example data the duration never changes and therefore I was able to aggregate them into the bars shown in the components generically. To further extend and improve this approach, the data would need to have some kind of pointer to the key of each individual charge which makes it possible to aggregate them by a unique identifier.

##Things that I didn't get a chance to do due to already spending too much time on this task !
Thought it would be worth putting on here what I would have liked to have changed or improved if this were a real task to show I had further possible plans.
- The overview pie chart would be hoverable and highlight/navigate to their respective detailed breakdowns.
- The pie chart slices would have more useful information than leaving the user to guess how much those values are.
- Rather than color coding the detailed breakdown SingleChargeComponents in the table, only color them when the user hovers over each section in the ChargeSection bar.
- Make the colors on the ChargeSection bars different from the main colors used in the overview PieChart to avoid confusion.
