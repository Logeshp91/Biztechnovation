package com.biztechinovation

import android.content.Context
import android.os.Build
import android.telephony.SubscriptionInfo
import android.telephony.SubscriptionManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import org.json.JSONArray
import org.json.JSONObject

class SimInfoModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SimInfo"
    }

    @ReactMethod
    fun getSimNumbers(promise: Promise) {
        try {
            val subscriptionManager = reactApplicationContext.getSystemService(
                Context.TELEPHONY_SUBSCRIPTION_SERVICE
            ) as SubscriptionManager

            val simArray = JSONArray()

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
                val subscriptionInfoList = subscriptionManager.activeSubscriptionInfoList
                if (!subscriptionInfoList.isNullOrEmpty()) {
                    for ((index, info) in subscriptionInfoList.withIndex()) {
                        val simInfo = JSONObject()
                        simInfo.put("slotIndex", info.simSlotIndex)
                        simInfo.put("carrierName", info.carrierName ?: "")
                        simInfo.put("displayName", info.displayName ?: "")
                        simInfo.put("number", info.number ?: "")
                        simArray.put(simInfo)
                    }
                    promise.resolve(simArray.toString())
                } else {
                    promise.resolve("[]") // No SIM info available
                }
            } else {
                promise.resolve("[]") // Not supported
            }
        } catch (e: Exception) {
            promise.reject("SIM_ERROR", e.message, e)
        }
    }
}
