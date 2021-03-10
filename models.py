from app import db

class Leaders(db.Model):
    #id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80),unique=True, primary_key=True, nullable=False)
    wins = db.Column(db.Integer, nullable=False)

    
    def __repr__(self):
        return '<Person %r>' % self.username

        