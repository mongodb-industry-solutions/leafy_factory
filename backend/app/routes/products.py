from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from app.database import products_coll
from pymongo.errors import DuplicateKeyError


router = APIRouter()


# Get product by product_id
@router.get("/products/{product_id}",
            summary="Gets a specified product by product_id",
            description="This endpoint gets a specified product from the leafy_factory database using the product_id field as filter criteria",
            responses={
                200: {
                    "description": "Product retrivied successfully",
                    "content": {
                        "application/json":{
                            "example": {
                                "_id":"67509e2029e80d360bf423cf",
                                "product_id":2,
                                "product_name":"Titanium Hammer",
                                "description":"Titanium Hammer With Curved Hickory Handle",
                                "materials_used":[
                                    {
                                        "item_code":"titanium_lw",
                                        "quantity":0.45,
                                        "unit_measurement":"kg",
                                        "cost_per_part":30
                                    },
                                    {
                                        "item_code":"wood_hc",
                                        "quantity":0.2,
                                        "unit_measurement":"kg",
                                        "cost_per_part":4
                                    },
                                    {
                                        "item_code":"magnet_nm",
                                        "quantity":0.01,
                                        "unit_measurement":"kg",
                                        "cost_per_part":50
                                    },
                                    {
                                        "item_code":"fasteners_ham",
                                        "quantity":0.02,
                                        "unit_measurement":"kg",
                                        "cost_per_part":1
                                    }
                                ]
                            }
                        }
                    }
                }
            })
def get_product_by_id(product_id: int):
    product_item = products_coll.find_one({"product_id" : product_id})
    if not product_item:
        raise HTTPException (
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product not found"
        )
    
    # Convert ObjectId to string for JSON serialization
    product_item["_id"] = str(product_item["_id"])
    
    #Returns a list of JSON documents (work_order_list)
    return product_item


# Get product materials_used by product_id
@router.get("/products_materials/{product_id}",
            summary="Gets the materials_used from a product",
            description="This endpoint retrieves the materials_used sub nested document from the product document using product_id as filter criteria",
            responses={
                200: {
                    "description": "materials_used retrivied successfully",
                    "content": {
                        "application/json":{
                            "example": {
                                "materials_used":[
                                    {
                                        "item_code":"titanium_lw",
                                        "quantity":0.45,
                                        "unit_measurement":"kg",
                                        "cost_per_part":30
                                    },
                                    {
                                        "item_code":"wood_hc",
                                        "quantity":0.2,
                                        "unit_measurement":"kg",
                                        "cost_per_part":4
                                    },
                                    {
                                        "item_code":"magnet_nm",
                                        "quantity":0.01,
                                        "unit_measurement":"kg",
                                        "cost_per_part":50
                                    },
                                    {
                                        "item_code":"fasteners_ham",
                                        "quantity":0.02,
                                        "unit_measurement":"kg",
                                        "cost_per_part":1
                                    }
                                ]
                            }
                        }
                    }
                }
            })
def get_materials_used_by_id(product_id: int):
    materials_used = products_coll.find_one({"product_id" : product_id},{"materials_used": 1, "_id":0})
    if not materials_used:
        raise HTTPException (
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product not found"
        )
    
    #Returns a list of JSON documents (work_order_list)
    return materials_used