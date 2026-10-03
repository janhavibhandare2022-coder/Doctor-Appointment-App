const express = require('express');
const router = express.Router();
const Service = require('../Models/service.js');

router.get('/', async (req, res) => {
  try {
    let services = await Service.find();
    if (services.length === 0) {
      const defaultServices = [
        { title: 'Regular healthcare package', description: 'Comprehensive regular health checkups and consultation.' },
        { title: 'CT-SCAN | X-RAY', description: 'Advanced digital imaging and fast diagnosis.' },
        { title: 'Lab Test', description: 'Complete blood count, pathology, and diagnostic testing.' },
        { title: 'Gynee health', description: 'Specialized women healthcare and consultation.' }
      ];
      services = await Service.insertMany(defaultServices);
    }
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;