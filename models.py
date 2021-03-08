from app import db

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, priomary_key=True)
    username = db.Column(db.String(80),unique=True, nullable=False)
    #wins = db.Column(db.Integer, nullable=False)
    
    
    def __repr__(self):
        return '<Person %r>' % self.username