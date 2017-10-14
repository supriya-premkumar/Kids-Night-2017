import numpy
import random
import json
constants = {}
def get_result(json_data, reset):
    # Parse throttle, previous values, difficulty level
    out = {}
    global constants
    if (reset):
        constants = {}
        constants = get_constants_by_difficulty_level(json_data["difficulty_level"])
    throttle = json_data["throttle"]
    # constants = update_constants(constants)
    u = -(constants["f"]/constants["R"])
    #p1 = C1*X1 + D1*u
    p1 = numpy.dot(constants["C1"], constants["X1"]).item(0) + constants["D1"] * u
    #X1 = A1*X1 + B1*u
    constants["X1"] = numpy.dot(constants["A1"], constants["X1"]) +  numpy.dot(constants["B1"], u)

    #p2 = C2*X2 + D2*u
    p2 = numpy.dot(constants["C2"], constants["X2"]).item(0) + constants["D2"] * u
    #X2 = A2*X2 + B2*u
    constants["X2"] = numpy.dot(constants["A2"], constants["X2"]) +  numpy.dot(constants["B2"], u)

    #p3 = C3*X3 + D3*u
    p3 = numpy.dot(constants["C3"], constants["X3"]).item(0) + constants["D3"] * u
    #X3 = A3*X3 + B3*u
    constants["X3"] = numpy.dot(constants["A3"], constants["X3"]) +  numpy.dot(constants["B3"], u)

    #pg = Cg*Xg + Dg*(auto[m]*u + throttle)
    pg = constants["CC_PERCENT"]*(numpy.dot(constants["C1"], constants["X1"]).item(0) + constants["D1"] * (constants["M"]*u + throttle)) +\
         constants["CT_PERCENT"]*(numpy.dot(constants["C1"], constants["X1"]).item(0) + constants["D1"] * (constants["M"]*u + throttle)) +\
         constants["HYD_PERCENT"]*(numpy.dot(constants["C1"], constants["X1"]).item(0) + constants["D1"] * (constants["M"]*u + throttle)) +\
         constants["RENW_PERCENT"] +\
         constants["NUKE_PERCENT"]
    #Xg = Ag*Xg + Bg*(auto[m]*u + throttle)
    constants["X1"] = numpy.dot(constants["A1"], constants["X1"]) +  numpy.dot(constants["B1"], (u + throttle))
    constants["X2"] = numpy.dot(constants["A2"], constants["X3"]) +  numpy.dot(constants["B2"], (u + throttle))
    constants["X3"] = numpy.dot(constants["A3"], constants["X3"]) +  numpy.dot(constants["B3"], (u + throttle))

    #p = K1*p1 + K2*p2 + K3*p3 + K4 + K5 + Kg*pg + Kd[m]*randn
    total_power = constants["CC_PERCENT"]*p1 +\
                  constants["CT_PERCENT"]*p2 +\
                  constants["HYD_PERCENT"]*p3 +\
                  constants["RENW_PERCENT"] +\
                  constants["NUKE_PERCENT"] +\
                  constants["Kg"]*pg +\
                  constants["Kd"]*constants["M"]*random.random()
    constants["f"] = constants["Cf"]*constants["M"]*constants["Xf"] +\
                       constants["Df"]*constants["M"]*total_power

    #Xf = Af[m]*Xf + Bf[m]*p
    constants["Xf"] = constants["Af"]*constants["M"]*constants["Xf"] +\
                        constants["Bf"]*constants["M"]*total_power
    Pe0 = constants["Pe"]
    Ce = constants["Pe"]
    Pe = pg
    Ce = Ce + constants["Kg"]*Pe/3600.0*Pe
    Cr = -constants["f"]*constants["Kg"]*(Pe-Pe0)*3600.0*constants["Pr"]
    score = constants["score"]
    score = score + Ce + Cr
    out["score"] =  round(score*100, 2)/100
    out["frequency"] = round((constants["f"]+1)*60*1000,2)/1000
    return json.dumps(out)


def get_constants_by_difficulty_level(difficulty_level):
    global constants
    if difficulty_level.lower() == "easy":
        # Initial constants
        constants["f"] = 0
        constants["CC_PERCENT"] = 0.05
        constants["CT_PERCENT"] = 0.2
        constants["HYD_PERCENT"] = 0.4
        constants["RENW_PERCENT"] = 0.1
        constants["NUKE_PERCENT"] = 0.25
        constants["score"] = 0

        # System Responses
        constants["R"] = 0.05
        constants["M"] = 10
        constants["Af"] = 0.9048
        constants["Bf"] = 0.2500
        constants["Cf"] = 0.3628
        constants["Df"] = 0.0476
        constants["Kd"] = 0.005
        constants["Kg"] = 0.0001
        constants["Xf"] = 0
        constants["Pe"] = 100
        constants["Pr"] = 0

        # Combustion Turbines
        constants["X1"] = numpy.matrix('0; 0')
        constants["A1"] = numpy.matrix('-0.6786,-0.4286; 0.25, 0')
        constants["B1"] = numpy.matrix('2; 0')
        constants["C1"] = numpy.matrix('0.2950,0.7972')
        constants["D1"] = 0.4464

        # Combined Cycle Turbines
        constants["X2"] = numpy.matrix('0; 0; 0')
        constants["A2"] = numpy.matrix('0.1881,0.4810,0.3714 ; 1,0,0 ; 0,0.25,0')
        constants["B2"] = numpy.matrix('1; 0; 0')
        constants["C2"] = numpy.matrix('0.2434,0.03872,-0.3235')
        constants["D2"] = 0.1548

        # Hydro Turbines
        constants["X3"] = numpy.matrix('0; 0; 0')
        constants["A3"] = numpy.matrix('0.5455,0.8349,0; 0.5,0,0; 0,0.5,0')
        constants["B3"] = numpy.matrix('1;0;0')
        constants["C3"] = numpy.matrix('0.116,0.0966,-0.5009')
        constants["D3"] = -0.05102

    elif difficulty_level.lower() == "medium":
        # Initial constants
        constants["f"] = 0
        constants["CC_PERCENT"] = 0.1
        constants["CT_PERCENT"] = 0.15
        constants["HYD_PERCENT"] = 0.35
        constants["RENW_PERCENT"] = 0.2
        constants["NUKE_PERCENT"] = 0.2
        constants["score"] = 0

        # System Responses
        constants["R"] = 0.05
        constants["M"] = 8
        constants["Af"] = 0.8824
        constants["Bf"] = 0.2500
        constants["Cf"] = 0.4429
        constants["Df"] = 0.0588
        constants["Kd"] = 0.01
        constants["Kg"] = 0.001
        constants["Xf"] = 0
        constants["Pe"] = 50
        constants["Pr"] = 25

        # Combustion Turbines
        constants["X1"] = numpy.matrix('0; 0')
        constants["A1"] = numpy.matrix('-0.6786,-0.4286; 0.25, 0')
        constants["B1"] = numpy.matrix('2; 0')
        constants["C1"] = numpy.matrix('0.2950,0.7972')
        constants["D1"] = 0.4464

        # Combined Cycle Turbines
        constants["X2"] = numpy.matrix('0; 0; 0')
        constants["A2"] = numpy.matrix('0.1881,0.4810,0.3714 ; 1,0,0 ; 0,0.25,0')
        constants["B2"] = numpy.matrix('1; 0; 0')
        constants["C2"] = numpy.matrix('0.2434,0.03872,-0.3235')
        constants["D2"] = 0.1548

        # Hydro Turbines
        constants["X3"] = numpy.matrix('0; 0; 0')
        constants["A3"] = numpy.matrix('0.5455,0.8349,0; 0.5,0,0; 0,0.5,0')
        constants["B3"] = numpy.matrix('1;0;0')
        constants["C3"] = numpy.matrix('0.116,0.0966,-0.5009')
        constants["D3"] = -0.05102

    elif difficulty_level.lower() == "hard":
        # Initial constants
        constants["f"] = 0
        constants["CC_PERCENT"] = 0.15
        constants["CT_PERCENT"] = 0.10
        constants["HYD_PERCENT"] = 0.3
        constants["RENW_PERCENT"] = 0.3
        constants["NUKE_PERCENT"] = 0.15
        constants["score"] = 0

        # if difficulty_level.lower() == "easy":
        # System Responses
        constants["R"] = 0.05
        constants["M"] = 6
        constants["Af"] = 0.9048
        constants["Bf"] = 0.2500
        constants["Cf"] = 0.3628
        constants["Df"] = 0.0476
        constants["Kd"] = 0.02
        constants["Kg"] = 0.1
        constants["Xf"] = 0
        constants["Pe"] = 25
        constants["Pr"] = 50

        # Combustion Turbines
        constants["X1"] = numpy.matrix('0; 0')
        constants["A1"] = numpy.matrix('-0.6786,-0.4286; 0.25, 0')
        constants["B1"] = numpy.matrix('2; 0')
        constants["C1"] = numpy.matrix('0.2950,0.7972')
        constants["D1"] = 0.4464

        # Combined Cycle Turbines
        constants["X2"] = numpy.matrix('0; 0; 0')
        constants["A2"] = numpy.matrix('0.1881,0.4810,0.3714 ; 1,0,0 ; 0,0.25,0')
        constants["B2"] = numpy.matrix('1; 0; 0')
        constants["C2"] = numpy.matrix('0.2434,0.03872,-0.3235')
        constants["D2"] = 0.1548

        # Hydro Turbines
        constants["X3"] = numpy.matrix('0; 0; 0')
        constants["A3"] = numpy.matrix('0.5455,0.8349,0; 0.5,0,0; 0,0.5,0')
        constants["B3"] = numpy.matrix('1;0;0')
        constants["C3"] = numpy.matrix('0.116,0.0966,-0.5009')
        constants["D3"] = -0.05102
    return constants
