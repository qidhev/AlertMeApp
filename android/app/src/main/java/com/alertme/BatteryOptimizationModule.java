package com.alertme;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class BatteryOptimizationModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private static final int REQUEST_CODE = 1001;
    private Promise mPromise;

    public BatteryOptimizationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "BatteryOptimization";
    }

    @ReactMethod
    public void isIgnoringBatteryOptimizations(Promise promise) {
        Context context = getReactApplicationContext();
        PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        boolean isIgnoring = false;
        isIgnoring = pm.isIgnoringBatteryOptimizations(context.getPackageName());
        promise.resolve(isIgnoring);
    }

    @ReactMethod
    public void requestIgnoreBatteryOptimizations(Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            promise.reject("Activity doesn't exist");
            return;
        }

        mPromise = promise;

        Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
        intent.setData(Uri.parse("package:" + activity.getPackageName()));
        activity.startActivityForResult(intent, REQUEST_CODE);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_CODE) {
            if (mPromise != null) {
                PowerManager pm = (PowerManager) activity.getSystemService(Context.POWER_SERVICE);
                boolean isIgnoring = false;
                isIgnoring = pm.isIgnoringBatteryOptimizations(activity.getPackageName());
                mPromise.resolve(isIgnoring);
                mPromise = null;
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        // Do nothing
    }
}