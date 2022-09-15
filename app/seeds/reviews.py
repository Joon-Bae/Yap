from app.models import db, Review

# Add business to existing accounts
def seed_reviews():
    review1 = Review(
        business_id=2,
        user_id=1,
        rating=4,
        review="Bright early learning is one place that I know they genuinely care for my kids. The teachers here are awesome"
    )

    review2 = Review(
        business_id=1,
        user_id=2,
        rating=5,
        review="These are by far the best donuts that I have ever had! They are fresh and always do good"
    )


    db.session.add(review1)
    db.session.add(review2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the businesses table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
