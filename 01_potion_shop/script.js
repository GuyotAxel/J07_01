let ingredients = ["mandrake", "slime", "stardust", "mushroom"]
let stock = ['6', '6', '6', '6']

    //Step_1

function getQty(name)
{
    let a = ingredients.indexOf(name)
    if (a != -1)
    {
        return(stock[a])
    }
    return(0)
}

// console.log(getQty("mandrake"))
// console.log(getQty("slime"))
// console.log(getQty("stardust"))
// console.log(getQty("mushroom"))
// console.log(getQty("machin"))

    //Step_2

function restock(name, qty)
{
    let a = ingredients.indexOf(name)
    let nbr = 0

    if (qty < 0)
    {
        return(0)
    }
    else if (a === -1)
    {
        a = ingredients.length
        ingredients.push(name)
        stock.push(qty)
    }
    else
    {
        let nbr = Number(stock[a])
        stock[a] = nbr + qty
    }
    return(`MAJ stock : ${ingredients[a]} = ${stock[a]}`)
}

//console.log(restock("mandrake", 5))
//console.log(restock("herbe à chat", 5))

function totalStock()
{
    let resultat = 0
    for (a = 0; a < stock.length; a++)
    {
        nbr = Number(stock[a])
        resultat += nbr
    }
    console.log(resultat)
}

//totalStock()

    //Step_3

const recipes =
{
    heal: ["mushroom", "stardust"],
    sticky: ["slime", "slime", "mushroom"]
}

function canBrew(potionName)
{
    let temp = []
    for (let a = 0; a < recipes[potionName].length; a++)
    {
        temp += recipes[potionName][a]
        if (recipes[potionName][a + 1])
        [
        temp += "/"
        ]
    }
    temp = temp.split("/")
    let tempKey =
    {
        material: "",
        qty: 0
    }
    function duplicate(element)
    {
        return (element === temp[0])
    }
    function ignore(element)
    {
        return (element != temp[0])
    }
    while (temp.length > 0)
    {
        let temp2 = temp.filter(duplicate)
        
        temp = temp.filter(ignore)
        if (ingredients.includes(temp2[0]))
        {
            tempKey.material = temp2[0]           
            tempKey.qty = temp2.length
            let b = ingredients.indexOf(tempKey.material)
            //console.log(temp)
            //console.log(temp2)
            if (tempKey.qty > stock[b])
            {
                return(false)
            }
        }
        else
        {
            return(0)
        }
    }
    return(true)
}
//console.log(canBrew("heal"))
//console.log(canBrew("sticky"))

function brew(potionName)
{
    if (canBrew(potionName) != true)
    {
        return(false)
    }
    let temp = []
    for (let a = 0; a < recipes[potionName].length; a++)
    {
            //console.log(recipes[potionName])
            temp += recipes[potionName][a]
            if (recipes[potionName][a + 1])
            [
                temp += "/"
            ]
    }
    temp = temp.split("/")
    while (temp.length > 0)
    {
        let b = ingredients.indexOf(temp[0])
        stock[b]--
        temp.shift()
    }
    return(true)
}

//console.log(brew("heal"))
//console.log(brew("sticky"))
//console.log(brew("sticky"))

//console.log(stock)

    //Step_4

function processOrder(order)
{
    //totalStock() //vérification
    let temp = []
    let orderStatus = 
    {
        done: 0,
        remaining: 0,
        missing: []
    }
    //let échec = []
    for (let a = 0; a < order.length; )
    {

        if (canBrew(order[0]) === false)
        {
            //échec.push(order[0])
            orderStatus.remaining++
//_____________function canbrew modifié_______________________________________________________________________________________________________________________
            for (let a = 0; a < recipes[order[0]].length; a++)
            {
                
                temp.push(recipes[order[0]][a])
            }
            let tempKey =
            {
                material: "",
                qty: 0
            }
            function duplicate(element)
            {
                return (element === temp[0])
            }
            function ignore(element)
            {
                return (element != temp[0])
            }
            while (temp.length > 0)
            {
                //console.log(`temp = ` + temp)
                let temp2 = temp.filter(duplicate)        
                temp = temp.filter(ignore)
                console.log(temp)
                if (ingredients.includes(temp2[0]))
                {
                    tempKey.material = temp2[0]           
                    tempKey.qty = temp2.length
                    let x = ingredients.indexOf(tempKey.material)
            //console.log(temp)
            //console.log(temp2)
                    if (tempKey.qty > stock[x] && orderStatus["missing"].includes(tempKey.material) === false)
                    {
                        orderStatus.missing.push(tempKey.material)
                    }
                }
            }
            //console.log(`tempKey.material = ` + tempKey.material)
            order.shift()
            temp = []
//_____________function canbrew modifié_______________________________________________________________________________________________________________________

        }
        
        else
        {
            let temp = []
            //console.log(recipes[order[0]][0])
            //console.log(order[0])
            for (let a = 0; a < recipes[order[0]].length; a++)
            {
                //console.log(order[a])
                //console.log(recipes[order[a]])
                temp.push(recipes[order[0]][a])
                //console.log(temp)
            }
            a = 0
            while (temp.length > 0)
            {
                let b = ingredients.indexOf(temp[0])
                //console.log(temp[0])
                //console.log(ingredients.indexOf(temp[0]))
                //console.log(b)
                stock[b]--
                temp.shift()
            }
            order.shift()
            //console.log(temp)
            orderStatus.done++    
        }
        console.log(`a = ` + a)
    }
    for (let key in orderStatus)
    {
        console.log(key + " : " + orderStatus[key])
    }
    //totalStock() //vérification
    //console.log(échec)
    console.log(stock)
    console.log(order)
    
    //console.log(order.length)
    
}

let order = ["heal", "sticky", "heal", "sticky", "heal", "sticky", "heal", "sticky", "heal", "sticky", "heal", "sticky", "heal", "sticky", "heal", "sticky", "heal", "sticky", "heal", "sticky"]

processOrder(order)

