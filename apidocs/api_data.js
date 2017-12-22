define({ "api": [  {    "type": "post",    "url": "/addEntry",    "title": "Add entry for a user",    "name": "Add_entry",    "group": "Entries",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "food",            "description": ""          },          {            "group": "Parameter",            "type": "Float",            "optional": false,            "field": "serving",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "Entries"  },  {    "type": "get",    "url": "/entries",    "title": "Get entries for a user",    "name": "Get_entries",    "group": "Entries",    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "Entries"  },  {    "type": "post",    "url": "/addFoodNutrient",    "title": "Add nutrient for a food",    "name": "Add_nutrient_for_a_food",    "group": "FoodNutrients",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "food",            "description": ""          },          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "nutrient",            "description": ""          },          {            "group": "Parameter",            "type": "Float",            "optional": false,            "field": "amount",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "FoodNutrients"  },  {    "type": "get",    "url": "/foodNutrient",    "title": "Get nutrients for a food",    "name": "Get_nutrients_for_a_food",    "group": "FoodNutrients",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "food",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "FoodNutrients"  },  {    "type": "post",    "url": "/addFood",    "title": "Add a food",    "name": "Add_food",    "group": "Foods",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "Foods"  },  {    "type": "get",    "url": "/foods",    "title": "Get foods",    "name": "Get_foods",    "group": "Foods",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Integer",            "optional": false,            "field": "pageNumber",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "Foods"  },  {    "type": "post",    "url": "/addNutrient",    "title": "Add nutrient",    "name": "Add_nutrient",    "group": "Nutrients",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "Nutrients"  },  {    "type": "get",    "url": "/nutrients",    "title": "Get all nutrients",    "name": "Get_all_nutrients",    "group": "Nutrients",    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "Nutrients"  },  {    "type": "post",    "url": "/register",    "title": "Register a user",    "name": "Register",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Object[]",            "optional": false,            "field": "user",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user.first_name",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user.last_name",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user.email",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user.password",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "User"  },  {    "type": "post",    "url": "/addWeight",    "title": "Add weight for a user",    "name": "Add_weight",    "group": "Weights",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Float",            "optional": false,            "field": "weight",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "Weights"  },  {    "type": "get",    "url": "/weights",    "title": "Get weights for a user",    "name": "Get_weights",    "group": "Weights",    "version": "0.0.0",    "filename": "./index.js",    "groupTitle": "Weights"  },  {    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "varname1",            "description": "<p>No type.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "varname2",            "description": "<p>With type.</p>"          }        ]      }    },    "type": "",    "url": "",    "version": "0.0.0",    "filename": "./apidocs/main.js",    "group": "_Users_teddy_Documents_projects_food_tracker_backend_apidocs_main_js",    "groupTitle": "_Users_teddy_Documents_projects_food_tracker_backend_apidocs_main_js",    "name": ""  },  {    "type": "post",    "url": "/login",    "title": "Login a user",    "name": "Login",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user.username",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user.password",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "./index.js",    "group": "_Users_teddy_Documents_projects_food_tracker_backend_index_js",    "groupTitle": "_Users_teddy_Documents_projects_food_tracker_backend_index_js"  }] });
