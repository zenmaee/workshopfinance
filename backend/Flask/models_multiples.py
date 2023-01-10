
###MIGHT BE NEEDED TO INTEGRATE MODELS TO REST OF CODE. CURRENTLY I DONT KNOW IF WE WILL NEED FLASK
###9/1/2023
class Multiples(db.Model):
    type = db.Column (db.Integer, primary_key=True) #type 0 is comp, type 1 is tgt
    pe = db.Column(db.Float, nullable=False)
    evEbitda = db.Column(db.Float, nullable=False)
    evEbit = db.Column(db.Float, nullable=False)
    evRevenue = db.Column(db.Float, nullable=False)

    def __init__(self, type, pe, evEbitda, evEbit, evRevenue):
        self.type=type
        self.pe=pe
        self.evEbitda=evEbitda
        self.evEbit=evEbit
        self.evRevenue=evRevenue

# Generate marshmallow Schemas from your models
class MultiplesSchema(ma.Schema):
    class Meta:
         #Fields to expose
        fields = ("type","pe", "evEbitda", "evEbit", "evRevenue")


multiples_schema = MultiplesSchema()
various_multiples_schema = MultiplesSchema(many=True)

