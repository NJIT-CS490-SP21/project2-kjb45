from app import db

class User(db.Model):
    id = db.Column(db.Integer, priomary_key=True)
    username = db.Column(db.String(80),unique=True, nullable=False)
    
    
    def __repr__(self):
        return '<Person %r>' % self.username