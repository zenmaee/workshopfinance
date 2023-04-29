import React from 'react';
import { StyleSheet, Button, ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';


function FootballFieldChart({valuations, userName, userEmail, userId, targets, targetId, footballFieldName, footballFieldTimeSeries, table, tableMean, tableRange, pixelsPerDollar, windowWidth, windowHeight, valuationWidth, valuationHeight, footballFieldOutput, footballFieldScale}) {

    return (
        <View>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {valuations ? (
                    valuations.map((valuation) => {
                        if (!isNaN(valuation.minValuation - table.minRange)) {
                            return (
                                <View style={{ marginTop: 5 }} key={valuation.name}>
                                    <Text>{valuation.name}</Text>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Valuation', {
                                            userName:userName,
                                            userEmail:userEmail,
                                            userId: userId,
                                            targets:targets,
                                            targetId: targetId,
                                            footballFieldName:footballFieldName,
                                            footballFieldName:footballFieldName,
                                            footballFieldTimeSeries:footballFieldTimeSeries,
                                            table:table,
                                            tableMean:tableMean, 
                                            tableRange:tableRange,
                                            pixelsPerDollar:pixelsPerDollar,
                                            windowWidth:windowWidth,
                                            windowHeight:windowHeight,
                                            valuationWidth:valuationWidth,
                                            valuationHeight:valuationHeight,
                                            valuationRender:valuation,
                                            valuationId:valuation.footballFieldId+"-"+valuation.valuationTimeSeries,
                                            valuationTimeSeries:valuation.valuationTimeSeries,
                                            valuationMetric:valuation.metric,
                                            valuationSpread:valuation.spread,
                                            valuationColor:valuation.color,
                                            valuationStat:valuation.stat,
                                            footballFieldOutput:footballFieldOutput,
                                            footballFieldScale:footballFieldScale
                                        })
                                    }}>
                                        <View
                                            style={{
                                            marginStart: (valuation.minValuation - table.minRange) * pixelsPerDollar,
                                            backgroundColor: valuation.color,
                                            height: valuationHeight,
                                            width: (valuation.maxValuation - valuation.minValuation) * pixelsPerDollar,
                                            marginTop: 5,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        } else {
                            return null;
                        }
                    })
                ) : null}
            </ScrollView>
            {footballFieldOutput === "EV" && (
                <Text style={{ textAlign: "right", marginBottom: 10, marginRight: 10, color: "gray" }}>
                    ($ in {footballFieldScale})
                </Text>
            )}
        </View>
    );

}

export default FootballFieldChart;
