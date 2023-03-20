const Coverage = ({ route, navigation }) => {
  const { userId, targets } = route.params;


  function TabFootballField() {
    const [footballFields, setFootballFields] = useState([])

    function retrieveFootballFields(targetId) {
      //let ffLists=[]
        const url = "http://10.239.106.85:5000/footballfields/" + targetId + "/";
        console.log(url)
        return fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            

            return data})
        
          .catch((error) => {
            console.error("Error fetching data:", error);
            return [];
            });}
        
          useEffect(() => {
              async function getFootballFields() {
                for (const target of targets) {
                  console.log("target:")
                  console.log(target)
                  const targetId = userId + "-" + target.targetSymbol;
                  let ffLists = await retrieveFootballFields(targetId);
                  console.log(ffLists)
                  setFootballFields([...footballFields, ...ffLists])
                }
            console.log("footballFields")
            console.log(footballFields)
          }
              getFootballFields();
            }, []);
