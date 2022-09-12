from app.models import db, Business

# Add business to existing accounts
def seed_businesses():
    business1 = Business(
        owner_id=1,
        title="Nightlight Donuts",
        description="We have been making donuts in the Yukon area for over 10 years now and have been voted as one of the best in the neighborhood",
        address1="100 W Main St",
        city="Yukon",
        state='Oklahoma',
        zip_code='73099',
        image_url='https://images.wallpaperscraft.com/image/single/donuts_sweets_pastries_132916_2560x1080.jpg'
    )

    business2 = Business(
        owner_id=2,
        title="Bright Early Learning",
        description="Bright Early Learning is a early education center designed to help young children grow their imagination and learn at a pace that is right for them",
        address1="3000 S Worchester Ave",
        city ='Tulsa',
        state ='Oklahoma',
        zip_code ='74102',
        image_url='https://policyoptions.irpp.org/wp-content/uploads/sites/2/2021/07/Wordpress-How-to-grow-an-accessible-high-quality-equitable-child-care-system.jpg'
    )


    db.session.add(business1)
    db.session.add(business2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the businesses table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
