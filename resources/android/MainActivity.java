package com.thnvn.caphephim;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import com.google.android.gms.cast.framework.CastContext;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
      registerPlugin(com.getcapacitor.community.admob.AdMob.class);
      super.onCreate(savedInstanceState);
      CastContext.getSharedInstance(this);
  }
}
