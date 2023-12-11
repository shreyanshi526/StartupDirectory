const express = require('express');
const router = express.Router();
const CSVService = require('../Services/CSVservice');

let data;
const func = async () => {
    try {
        data = await CSVService.getResult();
        //console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

func();

//api 1 - display a grid for all startup
router.get('/get-all-startup', (req, res) => {
    try {
        let newResult = data.map((item) => {
            return {
                Sno: item.Sno,
                StartupName: item.StartupName,
                Date: item.Date,
                CityLocation: item.CityLocation,
                AmountInUSD: item.AmountInUSD
            }
        })
        return res.status(200).json(newResult);
    } catch (error) {
        console.log(error)
    }
})

//api-2 : a popup with a detailed view of the startup

router.get('/get-detailed-view/:id', (req, res) => {
    const startupId = req.params.id;
    try {
        const foundStartup = data.find(item => item.SNo === startupId);
        if (foundStartup) {
            const detailedView = {
                SNo: foundStartup.SNo,
                Date: foundStartup.Date,
                StartupName: foundStartup.StartupName,
                IndustryVertical: foundStartup.IndustryVertical,
                SubVertical: foundStartup.SubVertical,
                CityLocation: foundStartup.CityLocation,
                AmountInUSD: foundStartup.AmountInUSD,
                InvestorsName: foundStartup.InvestorsName,
                InvestmentType: foundStartup.InvestmentType,
                Remarks: foundStartup.Remarks,
            };
            return res.status(200).json(detailedView);
        } else {
            return res.status(404).json({ error: 'Startup not found' });
        }

    } catch (error) {
        console.log(error)
    }

})

// api-3 :  filtering the list of startups based on IndustryType/Domain attribute.

router.get('/get-industry-specific-startups/:type',(req,res)=>{
    const IndustryType = req.params.type;
    try {
        const industrySpecificStartups = data
            .filter(item => item.IndustryVertical === IndustryType)
            .map(item => ({
                Sno: item.Sno,
                StartupName: item.StartupName,
                Date: item.Date,
                CityLocation: item.CityLocation,
                AmountInUSD: item.AmountInUSD,
            }));

        return res.status(200).json(industrySpecificStartups);
    } catch (error) {
        console.log(error)
    }

})

module.exports = router